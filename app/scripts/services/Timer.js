(function() {
  function Timer($interval, Tasks) {
    var Timer = {};
    Timer.Tasks = Tasks;
    Timer.workOrBreak = "work";
    Timer.interruptions = 0;
    Timer.startTime = 1500;
    Timer.time = 1500;
    Timer.completedCycles = 0;      // UPDATE TO QUERY FIREBASE AND RESET EVERY DAY, BY LOCAL TIME AT MIDNIGHT
    var button = $(".timer-button");

    Timer.start = function() {
      Timer.started = $interval(function() {
        Timer.time-=1;
        if (Timer.workOrBreak == "work" && Timer.Tasks.Tasks.currentTask) {
          Timer.Tasks.Tasks.updateTime(Timer.Tasks.Tasks.currentTask);
        }
        if (Timer.time == 0 && Timer.startTime == 1500) {
          Timer.ding.play();
          Timer.completedCycles++;
          Timer.break();
        } else if (Timer.time == 0 && Timer.startTime == 300) {
          Timer.ding.play();
          Timer.work();
        }
      }, 1000);
      $("#start").addClass("hide");
      $("#reset").removeClass("hide");
      $("#pause").removeClass("hide");
      $("#interrupted").removeClass("hide");
      $("#interruptions").removeClass("hide");
      // buttonContainer.html("<a ng-click=\"landing.Timer.reset()\" id=\"timer-button\">reset</a>");
    };

    Timer.reset = function() {
      $interval.cancel(Timer.started);
      Timer.time = Timer.startTime;
      $("#reset").addClass("hide");
      if($("#start").html() == "Resume") {
        $("#start").html("Start");
      }
      $("#start").removeClass("hide");
      $("#pause").addClass("hide");
      $("#interrupted").addClass("hide");
      $("#interruptions").addClass("hide");
      Timer.interruptions = 0;
    };

    Timer.pause = function() {
      $interval.cancel(Timer.started);
      delete Timer.started;
      $("#pause").addClass("hide");
      $("#start").removeClass("hide")
      $("#start").html("Resume");
    };

    Timer.break = function() {
      if (Timer.started) {
        Timer.workOrBreak = "break";
        if (Timer.completedCycles%4==0) {
          Timer.startTime = 1800;
          Timer.reset();
        } else {
        Timer.startTime = 300;
        Timer.reset();
        }
      }
    };

    Timer.work = function() {
      if (Timer.started) {
        Timer.workOrBreak = "work";
        Timer.startTime = 1500;
        Timer.reset();
        Timer.interruptions = 0;
      }
    };

    Timer.interrupted = function() {
      Timer.interruptions++;
    };

    Timer.ding = new buzz.sound( "../../assets/sounds/ding.mp3", {
      preload: true
    });

    return Timer;
  }

  angular
    .module('blocTime')
    .service('Timer', ['$interval', 'Tasks', Timer]);
 })();
