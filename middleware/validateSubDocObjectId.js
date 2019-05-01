const errorMessage = require('../utils/errorMessage');

const validateSubDocObjectId = (req, res, next) => {
  const { _roomId } = req.params;
  if (_roomId.match(/^[0-9a-fA-F]{24}$/)) {
    next();
  } else {
    res.status(400).json(errorMessage.invalidObjectId);
  }
};

module.exports = validateSubDocObjectId;
