const { joinChatGuest, joinChatsEmployee } = require('./joinFunction');
const { messageGuest } = require('./messageFunction');
const handleCloseTicket = require('./closeTicketFunction');
const assignSelfTicket = require('./assignSelfTicket');

const {
  JOIN,
  MESSAGE,
  CLOSE_TICKET,
  ASSIGN_SELF_TICKET,
} = require('./constants');
const USER_TYPES = require('../../models/USER_TYPES.js');
module.exports = chatSocket;

const jwt = require('jsonwebtoken');
const { super_secret } = require('../../utils/secrets');
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
          socket.user = user;
          // =================== SETUP FOR A EMPLOYEE ====================
          if (
            user.user_type === USER_TYPES.ADMIN ||
            user.user_type === USER_TYPES.SUPER_ADMIN ||
            user.user_type === USER_TYPES.RECEPTIONIST
          ) {
            // setup the employee by joining all his/her active chats
            // send a log of all active chats
            joinChatsEmployee(socket);
            // setup all listeners for a employee
            // can close a ticket
            socket.on(CLOSE_TICKET, chat_id =>
              handleCloseTicket(chat_id, socket, io),
            );
            // can assign himself to a ticket
            // NEEDS chat_id
            socket.on(ASSIGN_SELF_TICKET, chat_id => {
              assignSelfTicket(chat_id, socket);
            });
            // can message his chats-
            // NEEDS chat_ID and text

            // =================== SETUP FOR A GUEST ==================
          } else if (user.user_type === USER_TYPES.GUEST) {
            // setup the guest by joining chat
            // send a log of the guests chat
            joinChatGuest(socket);
            // setup all listeners for a guest
            // can send message
            socket.on(MESSAGE, text => messageGuest(text, socket, io));
            // NEEDS text
            // can rate
            // NEEDS rating
          }
        }
      });
    });
  });
}
