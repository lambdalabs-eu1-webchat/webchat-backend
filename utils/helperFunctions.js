module.exports = { remainder, randomMinMax };

function remainder(numerator, denominator) {
  const num = numerator / denominator;
  return num - Math.floor(num);
}

function randomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
