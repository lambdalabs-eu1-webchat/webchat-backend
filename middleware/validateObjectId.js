const errorMessage = require('../utils/errorMessage');

const validateObjectId = (req, res, next) => {
  const { _id } = req.params;
  if (_id.match(/^[0-9a-fA-F]{24}$/)) {
    next();
  } else {
    res.status(400).json(errorMessage.invalidObjectId);
  }
};

module.exports = validateObjectId;
