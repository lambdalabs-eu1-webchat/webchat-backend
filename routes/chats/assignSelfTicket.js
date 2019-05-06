// const USER_TYPES = require('../../models/USER_TYPES');
const { models } = require('../../models/index');

const { CHATLOG, CHATLOGS, REMOVE_QUEUED } = require('./constants');

module.exports = assignSelfTicket;

async function assignSelfTicket(chat_id, socket, io) {
  // get the chat requested to assign to
  const user = socket.user;
  const chat = await models.Chat.findById({
    _id: chat_id,
  });
  //check if no staff member
  if (!chat.staff_member.id) {
    // add self to the chatroom
    chat.staff_member = {
      id: user._id,
      name: user.name,
    };
    chat.save((error, chat) => {
      if (error) {
        socket.emit('console', 'saving staff member error');
        socket.emit('console', error);
      } else {
        // emit the new chat to the guest
        io.in(chat_id).emit(CHATLOG, chat);
        // add to chats and send updated list of chats to employee
        socket.chats.push(chat);
        socket.emit(CHATLOGS, socket.chats);
        // emit that the room is no longer in the queue
        io.in(user.hotel_id).emit(REMOVE_QUEUED, chat_id);
        // join the room
        socket.join(chat_id);
      }
    });
  }
}
