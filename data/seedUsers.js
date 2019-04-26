const faker = require('faker');
const { models } = require('../schemas/index');

const createUsers = async () => {
  try {
    // generate 20 fake users
    for (let i = 0; i < 20; i++) {
      const user = new models.User({
        // use Faker.js to generate fake users
        username: faker.fake('{{name.firstName}}'),
        id: i + 1,
      });
      await user.save();
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = createUsers;
