const { super_secret } = require('../utils/secrets');
const {
  SUPER_ADMIN,
  ADMIN,
  RECEPTIONIST,
  GUEST
} = require('../utils/USER_TYPES');

const hotelStaff = [SUPER_ADMIN, ADMIN, RECEPTIONIST];
const admins = [SUPER_ADMIN, ADMIN];
const users = [SUPER_ADMIN, ADMIN, RECEPTIONIST, GUEST];

module.exports = {
  config: {
    reqProp: 'headers',
    childProp: 'authorization',
    identifier: 'user_type',
    jwtKey: process.env.JWT_SECRET || super_secret
  },
  access: {
    email: hotelStaff
  }
};
