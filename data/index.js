const seedHotel = require("./seedHotels");

module.exports = async () => {
  const hotelIds = await seedHotel();
  console.log(hotelIds);
};
