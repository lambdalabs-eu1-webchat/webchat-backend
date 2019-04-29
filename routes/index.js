const userRoutes = require('./userRoutes');
const hotelRoutes = require('./hotelRoutes');
const { logger, errorLogger } = require('../middleware/winston');
const path = require('../utils/path');

module.exports = server => {
  // winston logger
  server.use(logger);

  // sanity check endpoint
  server.get('/', (req, res) => {
    res.status(200).json({ message: 'API is live!' });
  });

  // routes
  server.use(path.users, userRoutes);
  server.use(path.hotel, hotelRoutes);

  // error logger - must be last
  server.use(errorLogger);
};
