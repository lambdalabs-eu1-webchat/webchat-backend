const handleJoin = require('./joinFunction');
const handleMessage = require('./messageFunction');
const handleCloseTicket = require('./closeTicketFunction');
const handleGetActiveChats = require('./getActiveChats');

const { JOIN, MESSAGE, CLOSE_TICKET, ACTIVE_CHATS } = require('./constants');
const USER_TYPES = require('../../models/USER_TYPES.js');
module.exports = chatSocket;

const jwt = require('jsonwebtoken');
const { super_secret } = require('../../utils/secrets');
const { invalidCredentials } = require('../../utils/errorMessage');

const jwtKey = process.env.JWT_SECRET || super_secret;
const { models } = require('../../models/index');
function chatSocket(io) {
  io.on('connection', async socket => {
    socket.emit('connection', true);
    socket.on('login', token => {
      console.log(token);
      jwt.verify(token, jwtKey, async (err, decoded) => {
        if (err) {
          console.error(err);
          socket.emit('failed_login', 'Not a valid token');
        } else {
          const user = await models.User.findById({ _id: decoded.payload });
          socket.user = { id: user._id, name: user.name };
          socket.hotel_id = decoded.hotel_id;
          if (
            user.user_type === USER_TYPES.ADMIN ||
            user.user_type === USER_TYPES.SUPER_ADMIN ||
            user.user_type === USER_TYPES.RECEPTIONIST
          ) {
            // setup the employee by joining all his/her active chats
            // send a log of all active chats
          } else if (user.user_type === USER_TYPES.GUEST) {
            // setup the guest by joining chat
            // send a log of the guests chat
          }
        }
      });
    });
    // for guest needs user_id
    // for employee needs user_id and chat_id
    socket.on(JOIN, data => handleJoin(data, socket));
    socket.on(MESSAGE, data => handleMessage(data, socket, io));
    socket.on(CLOSE_TICKET, data => handleCloseTicket(data, socket, io));
    socket.on(ACTIVE_CHATS, data => handleGetActiveChats(data, socket));
  });
}
