const USER_TYPES = require('./USER_TYPES');

module.exports = { isStaff, isGuest };
function isStaff(user_type) {
  if (
    user_type === USER_TYPES.ADMIN ||
    user_type === USER_TYPES.SUPER_ADMIN ||
    user_type === USER_TYPES.RECEPTIONIST
  ) {
    return true;
  }
  return false;
}

function isGuest(user_type) {
  if (user_type === USER_TYPES.GUEST) {
    return true;
  }
  return false;
}
