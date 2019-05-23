const USER_TYPES = require('./USER_TYPES');

module.exports = (reqUserType, target) => {
  const { SUPER_ADMIN, ADMIN, RECEPTIONIST, GUEST } = USER_TYPES;
  let result = false;
  if (
    reqUserType === SUPER_ADMIN &&
    (target === ADMIN || target === RECEPTIONIST || target === GUEST)
  ) {
    result = true;
  } else if (
    reqUserType === ADMIN &&
    (target === RECEPTIONIST || target === GUEST)
  ) {
    result = true;
  } else if (reqUserType === RECEPTIONIST && target === GUEST) {
    result = true;
  } else {
    result = false;
  }
  return result;
};
