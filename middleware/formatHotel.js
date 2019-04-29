const formatHotelChange = (req, res, next) => {
  const hotel = req.body;
  if (hotel.name) {
    hotel.name = hotel.name
      .toLowerCase()
      .replace(/\b([a-z])/gi, char => char.toUpperCase());
    req.body = { ...hotel };
  }
  next();
};

module.exports = formatHotelChange;
