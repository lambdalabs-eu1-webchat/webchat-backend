const jwt = require('jsonwebtoken');
const { super_secret } = require('../utils/secrets');

const createToken = ({ user_id, name, hotel_id, chat_id }) =>
  jwt.sign(
    // token payload
    { payload: user_id, name, hotel_id, chat_id },
    // token secret
    process.env.JWT_SECRET || super_secret
  );

module.exports = createToken;
