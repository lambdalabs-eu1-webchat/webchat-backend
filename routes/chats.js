const MODEL_NAMES = require('../models/MODEL_NAMES');
const USER_TYPES = require('../models/USER_TYPES.js');
const { models } = require('../models/index');
module.exports = function chatSocket(io) {
  io.on('connection', async socket => {
    /**
     * chat_id:
     *
     * user:{
     *  id:
     *  name:
     *  user_type
     * }
     *
     */
    socket.on(JOIN, async data => {
      const promises = [];
      promises.push(models.Chat.findById({ _id: data.chat_id }));
      promises.push(models.User.findById({ _id: data.user.user_id }));
      const [chat, user] = await Promise.all(promises);

      socket.emit('console', chat);
      // check for the guest
      if (user.user_type === USER_TYPES.GUEST) {
        // find out if user belongs in room or if can join and do it
        if (chat.guest.id === user._id) {
          // it is the guest of this chat
          socket.join(data.chat_id);
        }
      } else if (
        user.user_type === USER_TYPES.ADMIN ||
        user.user_type === USER_TYPES.SUPER_ADMIN ||
        user.user_type === USER_TYPES.RECEPTIONIST
      ) {
        // check if no one is in or if he is in room
        if (!chat.staff_member || chat.staff_member.id === user._id) {
          // join the room
          socket.join(data.chat_id);
          // if joining change the staff_member
          if (!chat.staff_member) {
            chat.staff_member = { id: user._id, name: user.name };
          }
        }
      }
      chat.save();
    });

    socket.on(MESSAGE, async data => {
      io.in(data.chat_id).emit('message', {
        sender: data.user,
        text: data.text,
      });
      const chat = await models.Chat.findById({ _id: data.chat_id });
      chat.tickets[chat.tickets.length].messages.push({
        sender: data.user, // needs a name and id
        text: data.text, // string
      });
      chat.save();
    });
  });
};

const JOIN = 'join';
const MESSAGE = 'message';
