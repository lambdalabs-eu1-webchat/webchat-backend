module.exports = {
  remainder,
  randomMinMax,
  isEmail,
  updateUser,
  updateHotel,
};

function remainder(numerator, denominator) {
  const num = numerator / denominator;
  return num - Math.floor(num);
}

function randomMinMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function isEmail(email) {
  return email.test(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

function updateUser(current, newUser) {
  if (newUser.name) current.name = newUser.name;
  if (newUser.email) current.email = newUser.email;
  if (newUser.password) current.password = newUser.password;
  if (newUser.motto) current.motto = newUser.motto;
  if (newUser.user_type) current.user_type = newUser.user_type;
}

function updateHotel(current, updated) {
  if (updated.name) current.name = updated.name;
  if (updated.motto) current.motto = updated.motto;
}
