const faker = require('faker');
const { models } = require('../models/index');

const seedChats = async hotelIds => {
  // for each hotel
  hotelIds.forEach(async (hotelId, i) => {
    let hotel_id = hotelId.hotelId;
    hotelIds[i].guests.forEach(guest => {
      // make a chat log for each guest
      const tickets = [];
      for (let i = 0; i < 1; i++) {
        tickets.push({
          status: 'queue',
          messages: [
            {
              sender: {
                name: guest.name,
                id: guest.guestId,
              },
              text: faker.lorem.sentence(20),
            },
          ],
        });
      }
      models.Chat.insertMany({
        tickets,
        hotel_id,
        guest: {
          name: guest.name,
          id: guest.guestId,
        },
        room: guest.room,
      });
    });
  });
};

module.exports = seedChats;
