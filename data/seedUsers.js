const faker = require("faker");
const mongoose = require("mongoose");
const { models } = require("../models/index");

const seedUsers = async hotelIds => {
  hotelIds.forEach(async (hotelId, i) => {
    hotel_id = hotelId.hotelId;
    //make super admin
    const superAdminId = new mongoose.Types.ObjectId();
    const hotelUserIds = [superAdminId];
    await models.User.insertMany([
      {
        _id: superAdminId,
        hotel_id,
        name: faker.name.firstName(),
        email: `superAdmin${i}.superAdmin`,
        password: "1234",
        motto: faker.company.catchPhrase(),
        user_type: "super admin"
      }
    ]);
    // add admin
    const adminId = new mongoose.Types.ObjectId();
    hotelUserIds.push(adminId);
    models.User.insertMany([
      {
        _id: adminId,
        hotel_id,
        name: faker.name.firstName(),
        email: `admin${i}.admin`,
        password: "1234",
        motto: faker.company.catchPhrase(),
        user_type: "admin"
      }
    ]);

    // add receptionists
    for (let j = 0; j < 3; j++) {
      const receptionistId = new mongoose.Types.ObjectId();
      hotelUserIds.push(receptionistId);
      models.User.insertMany([
        {
          _id: receptionistId,
          hotel_id,
          name: faker.name.firstName(),
          email: faker.internet.email(),
          password: "1234",
          motto: faker.company.catchPhrase(),
          user_type: "recptionist"
        }
      ]);
    }
    // add guests
    for (let j = 0; j < 10; j++) {
      const guestId = new mongoose.Types.ObjectId();
      hotelUserIds.push(guestId);
      models.User.insertMany([
        {
          _id: guestId,
          hotel_id,
          name: faker.name.firstName(),
          passcode: `1234${j}${i}`,
          user_type: "guest"
        }
      ]);
    }
    // set the user ids
    hotelIds[i].userIds = hotelUserIds;
  });
  return hotelIds;
};

// const createUsers = async (hotelId) => {
//   try {
//     // generate 20 fake users
//     for (let i = 0; i < 20; i++) {
//       const user = new models.User({
//         // use Faker.js to generate fake users
//         username: faker.fake("{{name.firstName}}"),
//         id: i
//       });
//       console.log(user);
//       await user.save();
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

module.exports = seedUsers;
