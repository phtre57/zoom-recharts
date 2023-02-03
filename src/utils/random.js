export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

export function normalDistribution(n, mean, stddev) {
  var points = [];
  for (var i = 0; i < n; i++) {
    var x = 0;
    for (var j = 0; j < 12; j++) {
      x += Math.random();
    }
    x = stddev * (x - 6) + mean;
    points.push(x);
  }
  return points;
}
