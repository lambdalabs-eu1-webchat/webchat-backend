const { models } = require('../../models/index');

const USER_TYPES = require('../../models/USER_TYPES.js');

const getLastTicket = require('../../utils/getLastTicket');
module.exports = handleCloseTicket;

async function handleCloseTicket(data, socket, io) {
  // get the chat and user
  const promises = [];

  promises.push(models.Chat.findById({ _id: data.chat_id }));
  promises.push(models.User.findById({ _id: data.user_id }));
  const [chat, user] = await Promise.all(promises);
  // check if the staff member can close it
  const user_type = user.user_type;
  if (
    user_type === USER_TYPES.SUPER_ADMIN ||
    user_type.ADMIN ||
    chat.staff_member.id.equals(user.id)
  ) {
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
        io.emit.in(chat._id)('rating', { ticket_id: ticket._id });
      }
    });
  }
}
