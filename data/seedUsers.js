const faker = require('faker');
const { models } = require('../models/index');

const createUsers = async () => {
  try {
    // generate 20 fake users
    for (let i = 0; i < 20; i++) {
      const user = new models.User({
        // use Faker.js to generate fake users
        username: faker.fake("{{name.firstName}}"),
        id: i,
      });
      await user.save();

    }
  } catch (error) {
    console.error(error)
  }
};

module.exports = createUsers;