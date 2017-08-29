(function() {
  function LandingCtrl(Timer) {
    this.Timer = Timer;
    console.log(this.Timer.time);
  }

    angular
        .module('blocTime')
        .controller('LandingCtrl', ['Timer', LandingCtrl]);
})();
