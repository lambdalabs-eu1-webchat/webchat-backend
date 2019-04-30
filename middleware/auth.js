const jwt = require('jsonwebtoken');
const { super_secret } = require('../utils/secrets');

const jwtKey = process.env.JWT_SECRET || super_secret;

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.tokenPayload = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ message: 'No token provided.' });
  }
};
