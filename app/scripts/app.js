var time = 1500;

var minusSecond = function() {
  time -= 1;
}

var startTime = function() {
    $interval(minusSecond, 1000);
}
