const seedHotel = require('./seedHotels');
const seedUsers = require('./seedUsers');
const seedChats = require('./seedChats');
const { models } = require('../models/index');
module.exports = async () => {
  // remove all hotels
  try {
    await Promise.all([
      models.Chat.deleteMany({}),
      models.User.deleteMany({}),
      models.Hotel.deleteMany({}),
    ]);
    let hotels = await seedHotel();
    let hotelsWithUsers = await seedUsers(hotels);
    await seedChats(hotelsWithUsers);
    console.log('Done seeding');
  } catch (error) {
    console.log(error);
  }
};
