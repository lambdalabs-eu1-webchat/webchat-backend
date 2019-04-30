module.exports = { remainder, randomMinMax, isEmail };

function remainder(numerator, denominator) {
  const num = numerator / denominator;
  return num - Math.floor(num);
}

function randomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function isEmail(email) {
  return email.test(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}
