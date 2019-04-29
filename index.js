const server = require('./api/server');
const seed = require('./data/index');
const { connectDb, models } = require('./models/index');
require('dotenv').config();

const port = process.env.PORT || 7000;

connectDb()
  .then(async () => {
    try {
      const usersLength = await models.User.find();
      if (process.env.NODE_ENV === 'development' && usersLength.length === 0) {
        seed();
      }
      server.listen(port, () =>
        console.log(
          `=== Server running on port: ${port} in ${
            process.env.NODE_ENV
          } mode ====`,
        ),
      );
    } catch (error) {
      console.error(error);
    }
  })
  .catch(err => console.error(err));
