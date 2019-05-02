const userRoutes = require('./userRoutes');
const hotelRoutes = require('./hotelRoutes');
const roomRoutes = require('./roomRoutes');
const paymentRoutes = require('./paymentRoutes');
const { logger, errorLogger } = require('../middleware/winston');
const path = require('../utils/path');
const auth = require('./auth');

module.exports = server => {
  // winston logger
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'production'
  ) {
    server.use(logger);
  }

  // sanity check endpoint
  server.get('/', (req, res) => {
    res.status(200).json({ message: 'API is live!' });
  });

  // routes
  server.use(path.auth, auth);
  server.use(path.users, userRoutes);
  server.use(path.hotel, hotelRoutes);
  server.use(path.hotel, roomRoutes);
  server.use(path.subscribe, paymentRoutes);

  // error logger - must be last
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'production'
  ) {
    server.use(errorLogger);
  }
};
