const { super_secret } = require('../utils/secrets');
const {
  SUPER_ADMIN,
  ADMIN,
  RECEPTIONIST,
  GUEST
} = require('../utils/USER_TYPES');

module.exports = {
  config: {
    reqProp: 'headers',
    childProp: 'authorization',
    identifier: 'user_type',
    jwtKey: process.env.JWT_SECRET || super_secret
  },
  access: {
    admins: [SUPER_ADMIN, ADMIN],
    hotelStaff: [SUPER_ADMIN, ADMIN, RECEPTIONIST],
    users: [SUPER_ADMIN, ADMIN, RECEPTIONIST, GUEST]
  }
};
