const error = require('../utils/error');

const validateHotelPost = (req, res, next) => {
  const hotel = req.body;
  if (!hotel.name || !hotel.motto) {
    res.status(400).json(error.invalidHotelPost)
  } else {
    next();
  }
};

module.exports = validateHotelPost;
