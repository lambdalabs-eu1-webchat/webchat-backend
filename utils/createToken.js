const jwt = require('jsonwebtoken');
const { super_secret } = require('../utils/secrets');

const createToken = ({ id, name, hotel_id, passcode, user_type }) =>
  jwt.sign(
    // token payload
    { payload: id, name, hotel_id, passcode, user_type },
    // token secret
    process.env.JWT_SECRET || super_secret
  );

module.exports = createToken;
