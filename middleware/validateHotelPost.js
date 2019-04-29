const { models } = require('../models/index');
const error = require('../utils/error');

const validateHotelPost = async (req, res, next) => {
  const hotel = req.body;
  const hotelName = hotel.name
    .toLowerCase()
    .replace(/\b([a-z])/gi, char => char.toUpperCase());
  const hotelUniqueCheck = await models.Hotel.findOne({ name: hotelName });
  if (hotelUniqueCheck) {
    res.status(400).json(error.duplicateHotel);
  } else if (!hotel.name || !hotel.motto) {
    res.status(400).json(error.invalidHotelPost);
  } else {
    next();
  }
};

module.exports = validateHotelPost;
