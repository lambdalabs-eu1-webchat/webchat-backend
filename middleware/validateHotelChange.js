const errorMessage = require('../utils/errorMessage');

const validateHotelChange = (req, res, next) => {
  const hotel = req.body;
  if (!hotel.name && !hotel.motto) {
    res.status(400).json(errorMessage.invalidHotelPut);
  }
  else if (hotel.rooms) {
    res.status(400).json(errorMessage.restrictedHotelPut);
  } else {
    next();
  }
};

module.exports = validateHotelChange;
