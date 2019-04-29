const { models } = require('../models/index');
const error = require('../utils/error');

const validateHotelPost = async (req, res, next) => {
  const hotel = req.body;
  const hotelUniqueCheck = await models.Hotel.findOne({ name: hotel.name });
  if (!hotel.name || !hotel.motto) {
    res.status(400).json(error.invalidHotelPost);
  } else if (hotelUniqueCheck) {
    res.status(400).json(error.duplicateHotel);
  } else {
    next();
  }
};

module.exports = validateHotelPost;
