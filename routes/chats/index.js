const { joinChatGuest, joinChatsEmployee } = require('./joinFunction');
const { messageGuest, messageStaff } = require('./messageFunction');
const handleCloseTicket = require('./closeTicketFunction');
const assignSelfTicket = require('./assignSelfTicket');
const makeRating = require('./ratingFunction');
const { userStoppedTyping, userTyping } = require('./typingFunction.js');
const updateGuestChat = require('./updateGuestChat');
const checkout = require('./checkout');
const {
  MESSAGE,
  CLOSE_TICKET,
  ASSIGN_SELF_TICKET,
  RATING,
  LOGIN,
  FAILED_LOGIN,
  TYPING,
  STOPPED_TYPING,
  CONFIRM_DONE_TICKET,
  LOGOUT,
  CHECK_OUT,
} = require('./constants');

const { isGuest, isStaff } = require('../../utils/isUserType');

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
    socket.on(LOGOUT, () => {
      socket.disconnect();
    });
    socket.on(LOGIN, token => {
      jwt.verify(token, jwtKey, async (err, decoded) => {
        if (err) {
          socket.emit(FAILED_LOGIN, 'Not a valid token');
        } else {
          const user = await models.User.findById({
            _id: decoded.payload,
          });
          socket.user = user;
          // =================== SETUP FOR A EMPLOYEE ====================
          if (isStaff(user.user_type)) {
            // setup all listeners for a employee
            // can close a ticket
            socket.on(CLOSE_TICKET, chat_id =>
              handleCloseTicket(chat_id, socket, io),
            );
            // can assign himself to a ticket
            // NEEDS chat_id
            socket.on(ASSIGN_SELF_TICKET, chat_id => {
              assignSelfTicket(chat_id, socket, io);
            });
            // can message his chats-
            // NEEDS chat_ID and text
            socket.on(MESSAGE, ({ chat_id, text }) => {
              messageStaff(chat_id, text, socket, io);
            });
            // set up when message is being composed functions
            socket.on(TYPING, chat_id => {
              userTyping(chat_id, socket, io);
            });
            socket.on(STOPPED_TYPING, chat_id => {
              userStoppedTyping(chat_id, socket, io);
            });
            socket.on(CHECK_OUT, guest_id => {
              checkout(guest_id, io);
            });
            socket.on('disconnect', () => {
              // emit the users rooms that this person is not typing
              socket.chats.forEach(chat =>
                userStoppedTyping(chat._id, socket, io),
              );
              console.log('disconnected');
            });
            // setup the employee by joining all his/her active chats
            // send a log of all active chats
            joinChatsEmployee(socket);
            // remove login listener so that a client cannot login multiple times and have the above events fire multiple times
            socket.removeListener(LOGIN, () => {});
          }
          // =================== SETUP FOR A GUEST ==================
          else if (isGuest(user.user_type)) {
            // if left only show messages else set up listeners
            // setup the guest by joining chat
            // send a log of the guests chat
            joinChatGuest(socket);
            if (!user.is_left) {
              // setup all listeners for a guest
              // can send message
              // NEEDS text
              socket.on(MESSAGE, text => messageGuest(text, socket, io));

              // can rate
              // NEEDS rating
              socket.on(RATING, rating => {
                makeRating(rating, socket);
              });
              // set up when message is being composed functions
              socket.on(TYPING, () => {
                userTyping(socket.chat._id, socket, io);
              });
              socket.on(STOPPED_TYPING, () => {
                userStoppedTyping(socket.chat._id, socket, io);
              });
              // confirm that ticket is closed so update socket state
              socket.on(CONFIRM_DONE_TICKET, () => {
                //update chat
                updateGuestChat(socket);
              });
              socket.on('disconnect', () => {
                // emit the users rooms that this person is not typing
                userStoppedTyping(socket.chat._id, socket, io),
                console.log('disconnected');
              });
            } else {
              socket.emit(CHECK_OUT);
            }
            // need to send something to say ticket is done so it can update on this side
            // remove login listener so that a client cannot login multiple times and have the above events fire multiple times
            socket.removeListener(LOGIN, () => {});
          }
        }
      });
    });
  });
}

// const { joinChatGuest, joinChatsEmployee } = require('./joinFunction');
// const { messageGuest, messageStaff } = require('./messageFunction');
// const handleCloseTicket = require('./closeTicketFunction');
// const assignSelfTicket = require('./assignSelfTicket');

// const {
//   MESSAGE,
//   CLOSE_TICKET,
//   ASSIGN_SELF_TICKET,
//   // RATING,
//   LOGIN,
//   FAILED_LOGIN,
// } = require('./constants');

// const { isGuest, isStaff } = require('../../utils/isUserType');

// module.exports = chatSocket;

// const jwt = require('jsonwebtoken');
// const { super_secret } = require('../../utils/secrets');
// const jwtKey = process.env.JWT_SECRET || super_secret;
// const { models } = require('../../models/index');

// function chatSocket(io) {
//   io.on('connection', async socket => {
//     console.log(socket.id);
//     // tell the server to do what it needs to for setup
//     // need so send a login with token
//     socket.emit('connection', true);
//     console.log('connected');
//     socket.on(LOGIN, token => {
//       console.log(token);
//       jwt.verify(token, jwtKey, async (err, decoded) => {
//         if (err) {
//           console.error(err);
//           socket.emit(FAILED_LOGIN, 'Not a valid token');
//         } else {
//           const user = await models.User.findById({
//             _id: decoded.payload,
//           });
//           socket.user = user;
//           // =================== SETUP FOR A EMPLOYEE ====================
//           if (isStaff(user.user_type)) {
//             joinChatsEmployee(socket);
//             console.log('joined');
//             console.log(socket.user);
//           }
//           // =================== SETUP FOR A GUEST ==================
//           else if (isGuest(user.user_type)) {
//             // setup the guest by joining chat
//             // send a log of the guests chat
//             joinChatGuest(socket);
//           }
//         }
//         socket.on('disconnect', () => {
//           console.log(`${socket.user.name} disconnected`);
//         });
//       });
//     });
//     socket.on('disconnect', () => {
//       console.log(`${socket.user} disconnected`);
//     });
//     // can close a ticket for employys
//     socket.on(CLOSE_TICKET, chat_id => {
//       if (socket.user && isStaff(socket.user.user_id)) {
//         handleCloseTicket(chat_id, socket, io);
//       }
//       socket.emit('error', 'Not a employee');
//     });
//     // can assign himself to a ticket for staff
//     // NEEDS chat_id
//     socket.on(ASSIGN_SELF_TICKET, chat_id => {
//       if (socket.user && isStaff(socket.user.user_id)) {
//         assignSelfTicket(chat_id, socket);
//       }
//       socket.emit('error', 'Not a employee');
//     });

//     // can message his chats-
//     // NEEDS chat_ID and text
//     // chat_id only needed for staff
//     socket.on(MESSAGE, ({ chat_id, text }) => {
//       console.log(socket.user);
//       if (socket.user && isStaff(socket.user.user_id)) {
//         messageStaff(chat_id, text, socket, io);
//       } else if (socket.user && isGuest(socket.user.user_id)) {
//         messageGuest(text, socket, io);
//       }
//     });
//   });
// }
