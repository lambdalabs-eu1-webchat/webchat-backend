const { joinChatGuest, joinChatsEmployee } = require('./joinFunction');
const { messageGuest, messageStaff } = require('./messageFunction');
const handleCloseTicket = require('./closeTicketFunction');
const assignSelfTicket = require('./assignSelfTicket');

const {
  MESSAGE,
  CLOSE_TICKET,
  ASSIGN_SELF_TICKET,
  // RATING,
  LOGIN,
  FAILED_LOGIN,
} = require('./constants');

const USER_TYPES = require('../../utils/USER_TYPES');
module.exports = chatSocket;

const jwt = require('jsonwebtoken');
const { super_secret } = require('../../utils/secrets');
const jwtKey = process.env.JWT_SECRET || super_secret;
const { models } = require('../../models/index');

function chatSocket(io) {
  io.on('connection', async socket => {
    // tell the server to do what it needs to for setup
    // need so send a login with token
    socket.emit('connection', true);
    console.log('connected');
    socket.on(LOGIN, token => {
      console.log(token);
      jwt.verify(token, jwtKey, async (err, decoded) => {
        if (err) {
          console.error(err);
          socket.emit(FAILED_LOGIN, 'Not a valid token');
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
            socket.on(MESSAGE, ({ chat_id, text }) => {
              messageStaff(chat_id, text, socket, io);
            });

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
            // ============================================================
            // NOT SURE IF WE ARE PLANNING ON GIVING RATING IN SOCKET OR NOT
            // MIGHT NOT NEED TO IF WE ARE NOT EMITING IT ANYWAHERE
            // ============================================================
            // socket.on(RATING, rating => {});
            // need to send something to say ticket is done so it can update on this side
          }
        }
      });
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
