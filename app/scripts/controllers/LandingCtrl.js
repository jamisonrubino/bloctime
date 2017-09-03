(function() {
  function LandingCtrl(Timer, Tasks, $scope) {
    this.Timer = Timer;
    this.Tasks = Tasks;
    var landing = this;

    this.deleteTask = function(task) {
      if (landing.Timer.started) {
        landing.Timer.pause();
        landing.Tasks.Tasks.deleteTask(task);
        landing.Timer.start();
      } else {
        landing.Tasks.Tasks.deleteTask(task);
      }
    };

    // $scope.$watch('landing.Timer.time', function() {
    //     if (landing.Timer.time == 1) {
    //         setTimeout(Timer.ding.play(), 1000);
    //     }
    // });

  }

    angular
        .module('blocTime')
        .controller('LandingCtrl', ['Timer', 'Tasks', '$scope', LandingCtrl]);
})();
