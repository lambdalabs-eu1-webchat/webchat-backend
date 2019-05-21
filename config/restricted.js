const { super_secret } = require('../utils/secrets');

module.exports = {
  restricted: {
    reqProp: 'headers',
    childProp: 'authorization',
    identifier: 'user_type',
    jwtKey: process.env.JWT_SECRET || super_secret
  }
};
