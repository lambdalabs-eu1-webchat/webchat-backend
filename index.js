const server = require("./api/server");
const createUsers = require("./data/seedUsers");
const { models, connectDb } = require("./models/index");
require("dotenv").config();

const port = process.env.PORT || 7000;

connectDb()
  .then(async () => {
    try {
      // erase DB on server refresh
      // you can add more models in the array
      // await Promise.all([models.User.deleteMany({}),]);

      // seed users on server refresh
      // createUsers();

      server.listen(port, () => console.log(`server up on ${port}`));
    } catch (error) {
      console.error(error);
    }
  })
  .catch(err => console.error(err));
