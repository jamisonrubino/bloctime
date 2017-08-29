(function() {
  function Timer($interval) {
    var Timer = {};
    Timer.time = 1500;
    var buttonContainer = $("#button-container");

    Timer.start = function() {
      Timer.started = $interval(function() {Timer.time-=1;}, 1000);
      buttonContainer.html("<a ng-click=\"landing.Timer.stop()\" id=\"timer-button\">Stop</a>");
    };

    Timer.stop = function() {
        Timer.time = 1500;
        $interval.cancel(Timer.started);

        buttonContainer.html("<a ng-click=\"landing.Timer.start()\" id=\"timer-button\">Start</a>");
    };

    return Timer;
  }

  angular
    .module('blocTime')
    .factory('Timer', ['$interval', Timer]);
 })();
