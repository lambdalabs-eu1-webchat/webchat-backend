const validator = require('email-validator');

const validateEmail = email => {
  if (validator.validate(email)) {
    return true;
  } else {
    return false;
  }
};

module.exports = validateEmail;
