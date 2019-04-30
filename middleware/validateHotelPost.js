const { models } = require('../models/index');
const errorMessage = require('../utils/errorMessage');

const validateHotelPost = async (req, res, next) => {
  const hotel = req.body;
  const hotelName = hotel.name;
  const hotelUniqueCheck = await models.Hotel.findOne({ name: hotelName });
  if (hotelUniqueCheck) {
    res.status(400).json(errorMessage.duplicateHotel);
  } else if (!hotel.name || !hotel.motto) {
    res.status(400).json(errorMessage.invalidHotelPost);
  } else {
    next();
  }
};

module.exports = validateHotelPost;
