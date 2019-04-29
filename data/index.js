const seedHotel = require('./seedHotels');
const seedUsers = require('./seedUsers');
const seedChats = require('./seedChats');
const { models } = require('../models/index');
module.exports = async () => {
  // remove all hotels
  await Promise.all([
    models.Chat.deleteMany({}),
    models.User.deleteMany({}),
    models.Hotel.deleteMany({}),
  ]);
  let hotelIds = await seedHotel();
  hotelIds = await seedUsers(hotelIds);
  seedChats(hotelIds);
  // hotelIds now looks like this
  // [
  //   {
  //     hotelId: objID,
  //     roomIds: [{objID, name}],
  //     superAdmin: {objID, name},
  //     admins:[{objID, name}]
  //     receptionists: [{receptionistId, name}],
  //     guests: [{ roomId: objID, guestId: objID, name }]
  //   }
  // ];
};
