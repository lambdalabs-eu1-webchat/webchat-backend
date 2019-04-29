const { models } = require('../models/index');
const mongoose = require('mongoose');
const faker = require('faker');

module.exports = hotelSeed; // returns array of hotels

function makeHotelrooms() {
  const rooms = [];
  const numberRooms = Math.random() * (20 - 7) + 7;
  for (let i = 1; i < numberRooms; i++) {
    const room = {
      _id: new mongoose.Types.ObjectId(),
      name: `${i}`,
    };
    rooms.push(room);
  }
  return rooms;
}

async function hotelSeed() {
  const hotels = [];
  // make hotels
  for (let i = 0; i < 2; i++) {
    const hotel = {
      _id: new mongoose.Types.ObjectId(),
      name: faker.company.companyName(),
      motto: faker.company.catchPhrase(),
      rooms: makeHotelrooms(),
    };
    hotels.push(hotel);
  }
  await models.Hotel.insertMany(hotels);
  return hotels;
}
