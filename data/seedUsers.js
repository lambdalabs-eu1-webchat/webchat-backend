const faker = require('faker');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { models } = require('../models/index');
const randomMinMax = require('../utils/helperFunctions.js').randomMinMax;
const remainder = require('../utils/helperFunctions.js').remainder;
const USER_TYPES = require('../models/USER_TYPES.js');

const seedUsers = async hotels => {
  const users = []; // list of promises to wait for
  const updatedHotels = JSON.parse(JSON.stringify(hotels));
  updatedHotels.forEach((hotel, i) => {
    const hotel_id = hotel._id;

    //make super admin for this hotel
    const superAdmin = {
      _id: new mongoose.Types.ObjectId(),
      hotel_id,
      name: faker.name.firstName(),
      email: `superAdmin${i}@superAdmin.com`,
      password: '1234',
      motto: faker.company.catchPhrase(),
      user_type: USER_TYPES.SUPER_ADMIN,
    };

    // make admins
    const admins = [];
    for (let j = 0; j < 3; j++) {
      admins.push({
        _id: new mongoose.Types.ObjectId(),
        hotel_id,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('1234', 10),
        motto: faker.company.catchPhrase(),
        user_type: USER_TYPES.ADMIN,
      });
    }
    // make receptionists
    const receptionists = [];
    const numberReceptionists = randomMinMax(2, 7); //Math.random() * (7 - 2) + 2;
    for (let j = 0; j < numberReceptionists; j++) {
      receptionists.push({
        _id: new mongoose.Types.ObjectId(),
        hotel_id,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('1234', 10),
        motto: faker.company.catchPhrase(),
        user_type: USER_TYPES.RECEPTIONIST,
      });
    }
    // make guests
    const guests = [];
    const numberGuests = randomMinMax(25, 50);
    const rooms = hotel.rooms;
    for (let j = 0; j < numberGuests; j++) {
      const roomIndex = Math.round(remainder(j, rooms.length) * rooms.length); // loops over all rooms
      guests.push({
        _id: new mongoose.Types.ObjectId(),
        hotel_id,
        name: faker.name.firstName(),
        passcode: `${j}${i}`,
        user_type: USER_TYPES.GUEST,
        room: {
          name: rooms[roomIndex].name,
          id: rooms[roomIndex]._id,
        },
        is_left: j / rooms.length > 1,
      });
    }
    updatedHotels[i].superAdmin = superAdmin;
    updatedHotels[i].admins = admins;
    updatedHotels[i].receptionists = receptionists;
    updatedHotels[i].guests = guests;
    users.push(superAdmin, ...admins, ...receptionists, ...guests);
    // set the user ids
  });
  console.log(`Users created: ${users.length} `);
  await models.User.insertMany(users);
  return updatedHotels;
};

module.exports = seedUsers;
