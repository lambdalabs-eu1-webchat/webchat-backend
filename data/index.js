const seedHotel = require("./seedHotels");
const seedUsers = require("./seedUsers");
const { models } = require("../models/index");
module.exports = async () => {
  // remove all hotels
  await Promise.all([
    models.Chat.deleteMany({}),
    models.User.deleteMany({}),
    models.Hotel.deleteMany({})
  ]);
  let hotelIds = await seedHotel();
  hotelIds = await seedUsers(hotelIds);
  console.log(hotelIds);
};
