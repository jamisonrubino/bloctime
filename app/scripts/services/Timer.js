(function() {
  function Timer($interval) {
    var Timer = {};
    Timer.startTime = 1500;
    Timer.time = 1500;
    var button = $(".timer-button");

    Timer.start = function() {
      Timer.started = $interval(function() {
        Timer.time-=1;
        if (Timer.time == 0 && Timer.startTime == 1500) {
          Timer.break();
        } else if (Timer.time == 0 && Timer.startTime == 300) {
          Timer.work();
        }
      }, 1000);
      $("#start").addClass("hide");
      $("#stop").removeClass("hide");
      // buttonContainer.html("<a ng-click=\"landing.Timer.stop()\" id=\"timer-button\">Stop</a>");
    };

    Timer.reset = function() {
      $interval.cancel(Timer.started);
      Timer.time = Timer.startTime;
      $("#stop").addClass("hide");
      $("#start").removeClass("hide")
    };

    Timer.stop = function() {
      if (Timer.started) {
        Timer.reset();
        // buttonContainer.html("<a ng-click=\"landing.Timer.start()\" id=\"timer-button\">Start</a>");
      }
    };

    Timer.break = function() {
      if (Timer.started) {
        Timer.startTime = 300;
        Timer.reset();
      } else {
        Timer.time = 300;
      }
    };

    Timer.work = function() {
      if (Timer.started) {
        Timer.startTime = 1500;
        Timer.reset();
      } else {
        Timer.time = 1500;
      }
    };

    return Timer;
  }

  angular
    .module('blocTime')
    .factory('Timer', ['$interval', Timer]);
 })();
