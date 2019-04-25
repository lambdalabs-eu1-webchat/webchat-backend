const faker = require('faker');

const createUsers = async () => {
  try {
    // generate 20 fake users
    for (let i = 0; i < 20; i++) {
      const user = new models.User({
        // use Faker.js to generate fake users
        username: faker.fake("{{name.firstName}}"),
      });
      await user.save();

    }
  } catch (error) {
    console.error(error)
  }
};

module.exports = createUsers;