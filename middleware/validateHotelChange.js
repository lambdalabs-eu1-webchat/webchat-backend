const error = require('../utils/error');

const validateHotelChange = (req, res, next) => {
  const hotel = req.body;
  if (!hotel.name && !hotel.motto) {
    res.status(400).json(error.invalidHotelPost);
  }
  else if (hotel.rooms) {
    res.status(400).json(error.restrictedHotelPut);
  } else {
    next();
  }
};

module.exports = validateHotelChange;
