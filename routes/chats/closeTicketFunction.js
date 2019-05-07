const { ACTIVE_CHATS, RATING } = require('./constants');

const getLastTicket = require('../../utils/getLastTicket');
module.exports = handleCloseTicket;

async function handleCloseTicket(chat_id, socket, io) {
  const chat = socket.chats.find(chat => chat._id.equals(chat_id));
  const user = socket.user;
  const ticket = getLastTicket(chat);
  // put staff member on the ticket
  ticket.staff_member.id = user._id;
  ticket.staff_member.name = user.name;
  // close the last ticket in the chat
  ticket.status = 'closed';
  // remove the staff_member from the chat
  chat.staff_member = null;
  chat.save(error => {
    if (error) {
      socket.emit('console', error);
    } else {
      // get a rating for the ticket
      io.in(chat._id).emit(RATING, ticket._id);
      // leave the chat
      socket.leave(chat._id);
      const newChats = socket.chats.filter(
        filterChat => !filterChat._id.equals(chat._id),
      );
      // update the chats of the employee
      socket.chats = newChats;
      socket.emit(ACTIVE_CHATS, newChats);
    }
  });
}
