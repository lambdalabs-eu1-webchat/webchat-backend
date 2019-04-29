const faker = require("faker");
const mongoose = require("mongoose");
const { models } = require("../models/index");

const seedUsers = async hotelIds => {
  const promises = [];
  await hotelIds.forEach(async (hotelId, i) => {
    hotel_id = hotelId.hotelId;

    //make super admin
    let name = faker.name.firstName();
    const superAdminId = new mongoose.Types.ObjectId();
    hotelIds[i].superAdmin = { superAdminId, name };

    promises.push(
      models.User.insertMany([
        {
          _id: superAdminId,
          hotel_id,
          name: faker.name.firstName(),
          email: `superAdmin${i}.superAdmin`,
          password: "1234",
          motto: faker.company.catchPhrase(),
          user_type: "super admin"
        }
      ])
    );
    // add admin
    const adminId = new mongoose.Types.ObjectId();
    // array so could add more later if want
    name = faker.name.firstName();
    hotelIds[i].adminIds = [{ adminId, name }];
    promises.push(
      models.User.insertMany([
        {
          _id: adminId,
          hotel_id,
          name,
          email: `admin${i}.admin`,
          password: "1234",
          motto: faker.company.catchPhrase(),
          user_type: "admin"
        }
      ])
    );

    // add receptionists
    hotelIds[i].receptionists = [];
    const recptionists = [];
    for (let j = 0; j < 3; j++) {
      const receptionistId = new mongoose.Types.ObjectId();
      name = faker.name.firstName();
      recptionists.push({
        _id: receptionistId,
        hotel_id,
        name,
        email: faker.internet.email(),
        password: "1234",
        motto: faker.company.catchPhrase(),
        user_type: "recptionist"
      });
      hotelIds[i].receptionists.push({ name, receptionistId });
    }
    promises.push(models.User.insertMany(recptionists));
    // add guests
    hotelIds[i].guests = [];
    const guests = [];
    for (let j = 0; j < 5; j++) {
      const guestId = new mongoose.Types.ObjectId();
      name = faker.name.firstName();
      guests.push({
        _id: guestId,
        hotel_id,
        name,
        passcode: `1234${j}${i}`,
        user_type: "guest",
        room: {
          name: `${j}`,
          id: hotelIds[i].roomIds[j]
        }
      });
      hotelIds[i].guests.push({
        guestId,
        name,
        room: {
          id: hotelIds[i].roomIds[j],
          name: `${j}`
        }
      });
    }
    promises.push(models.User.insertMany(guests));
    // set the user ids
  });
  await promises;
  return hotelIds;
};

module.exports = seedUsers;
