const { logger, errorLogger } = require('../middleware/winston');
const path = require('../utils/path');
const userRoutes = require('./userRoutes');
const auth = require('./auth');

module.exports = server => {
  // winston logger
  server.use(logger);

  // sanity check endpoint
  server.get('/', (req, res) => {
    res.status(200).json({ message: 'API is live!' });
  });

  // routes
  server.use(path.auth, auth);
  server.use(path.users, userRoutes);

  // error logger - must be last
  server.use(errorLogger);
};
