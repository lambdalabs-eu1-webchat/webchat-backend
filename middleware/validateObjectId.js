const error = require('../utils/error');

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    next();
  } else {
    res.status(400).json(error.invalidObjectId);
  }
};

module.exports = validateObjectId;
