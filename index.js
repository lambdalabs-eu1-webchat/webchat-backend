/* eslint-disable no-console */
const server = require('./api/server');
const httpServer = require('http').Server(server);
const io = require('socket.io')(httpServer);
const seed = require('./data/index');
const { models, connectDb } = require('./models/index');
require('dotenv').config();

const port = process.env.PORT || 7000;

connectDb()
  .then(async () => {
    try {
      const allUsersArray = await models.User.find();
      // run seeds if in development ENV & there are no users seeded in the DB
      if (
        process.env.NODE_ENV === 'development' &&
        allUsersArray.length === 0
      ) {
        seed();
      }
      httpServer.listen(port, () =>
        console.log(
          `=== Server running on port: ${port} in ${
            process.env.NODE_ENV
          } mode ====`,
        ),
      );
      require('./routes/chats/index')(io);
    } catch (error) {
      console.error(error);
    }
  })
  .catch(err => console.error(err));
