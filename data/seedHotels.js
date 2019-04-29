const { models } = require("../models/index");
const mongoose = require("mongoose");
const faker = require("faker");

function makeHotelIds() {
  const idArray = [];
  for (let i = 0; i < 2; i++) {
    idArray.push(new mongoose.Types.ObjectId());
  }
  return idArray;
}

function makeHotelroomIds() {
  const idArray = [];
  for (let i = 0; i < 5; i++) {
    idArray.push(new mongoose.Types.ObjectId());
  }
  return idArray;
}

module.exports = async () => {
  // make the ids for the hotel
  const hotelIds = makeHotelIds();
  // array to save to id of all rooms
  const hotelroomIds = [];

  hotels = hotelIds.map(hotelId => {
    // get all the room ids for this hotel
    roomIds = makeHotelroomIds();
    // save them in the higher scope
    hotelroomIds.push(roomIds);

    const rooms = roomIds.map((roomId, i) => {
      return { name: `room ${i}`, _id: roomId };
    });
    return {
      _id: hotelId,
      rooms,
      name: faker.company.companyName(),
      motto: faker.company.catchPhrase()
    };
  });
  await models.Hotel.insertMany(hotels);
  return hotelIds.map((hotelId, i) => {
    return {
      hotelId,
      roomIds: hotelroomIds[i]
    };
  });
};
