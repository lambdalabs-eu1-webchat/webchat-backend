const seedHotel = require('./seedHotels');
const seedUsers = require('./seedUsers');
const seedChats = require('./seedChats');
const { models } = require('../models/index');
module.exports = async () => {
  // remove all hotels
  try {
    await Promise.all([
      // models.Chat.deleteMany({}),
      models.User.deleteMany({}),
      models.Hotel.deleteMany({}),
    ]);
    console.log('here');
    let hotels = await seedHotel();
    let hotelsWithUsers = await seedUsers(hotels);
  } catch (error) {
    console.log(error);
  }
};
