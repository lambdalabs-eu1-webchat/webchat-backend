const errorMessage = require('../utils/errorMessage');

const validateRoomChange = (req, res, next) => {
  const room = req.body;
  if (!room.name) {
    res.status(400).json(errorMessage.invalidRoomPut);
  } else {
    next();
  }
};

module.exports = validateRoomChange;
