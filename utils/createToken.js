const jwt = require('jsonwebtoken');
const { super_secret } = require('../utils/secrets');

const createToken = ({ id, name, hotel_id }) =>
  jwt.sign(
    // token payload
    { payload: id, name, hotel_id },
    // token secret
    process.env.JWT_SECRET || super_secret,
  );

module.exports = createToken;
