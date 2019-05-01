const errorMessage = require('../utils/errorMessage');

const validateRoomsArr = (req, res, next) => {
  const roomsArr = req.body;

  if (!Array.isArray(roomsArr)) {
    res.status(400).json(errorMessage.typeArr);
  } else if (roomsArr.filter(room => !room.name).length) {
    res.status(400).json(errorMessage.noRoomName);
  } else {
    next();
  }
};

module.exports = validateRoomsArr;
