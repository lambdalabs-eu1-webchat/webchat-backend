const faker = require('faker');
const mongoose = require('mongoose');
const { models } = require('../models/index');

const seedUsers = async hotels => {
  const users = []; // list of promises to wait for
  hotels.forEach((hotel, i) => {
    hotel_id = hotel._id;

    //make super admin for this hotel
    const superAdmin = {
      _id: new mongoose.Types.ObjectId(),
      hotel_id,
      name: faker.name.firstName(),
      email: `superAdmin${i}.superAdmin`,
      password: '1234',
      motto: faker.company.catchPhrase(),
      user_type: 'super admin',
    };

    // make admins
    const admins = [];
    for (let j = 0; j < 3; j++) {
      admins.push({
        _id: new mongoose.Types.ObjectId(),
        hotel_id,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: '1234',
        motto: faker.company.catchPhrase(),
        user_type: 'admin',
      });
    }
    // make receptionists
    const receptionists = [];
    const numberReceptionists = Math.random() * (7 - 2) + 2;
    for (let j = 0; j < numberReceptionists; j++) {
      receptionists.push({
        _id: new mongoose.Types.ObjectId(),
        hotel_id,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: '1234',
        motto: faker.company.catchPhrase(),
        user_type: 'receptionist',
      });
    }
    // make guests
    const guests = [];
    const numberGuests = Math.random() * (50 - 25) + 25;
    const rooms = hotel.rooms;
    for (let j = 0; j < numberGuests; j++) {
      const roomIndex = Math.round(remainder(j, rooms.length) * rooms.length); // loops over all rooms
      guests.push({
        _id: new mongoose.Types.ObjectId(),
        hotel_id,
        name: faker.name.firstName(),
        passcode: `1234${j}${i}`,
        user_type: 'guest',
        room: {
          name: rooms[roomIndex].name,
          id: rooms[roomIndex]._id,
        },
      });
    }
    hotels[i].superAdmin = superAdmin;
    hotels[i].admins = admins;
    hotels[i].receptionists = receptionists;
    hotels[i].guests = guests;
    users.push(superAdmin, ...admins, ...receptionists, ...guests);
    // set the user ids
  });
  await models.User.insertMany(users);
  return hotels;
};

function remainder(numerator, denominator) {
  const num = numerator / denominator;
  return num - Math.floor(num);
}
module.exports = seedUsers;
