const MODEL_NAMES = require('../models/MODEL_NAMES');
const USER_TYPES = require('../models/USER_TYPES.js');
const { models } = require('../models/index');
module.exports = chatSocket;

function chatSocket(io) {
  io.on('connection', async socket => {
    socket.on(JOIN, async data => {
      // get the user
      const user = await models.User.findById({ _id: data.user_id });
      if (user.user_type === USER_TYPES.GUEST) {
        const chat = await models.Chat.findOne({
          'guest.id': data.user_id,
        });
        if (!chat) {
          // make a chat if they don't have one
          const newChat = new models.Chat({
            tickets: [
              {
                status: 'closed',
                messages: [],
              },
            ],
            guest: {
              id: user._id,
              name: user.name,
            },
            hotel_id: user.hotel_id,
            room: user.room,
          });
          newChat.save((error, chat) => {
            if (error) {
              console.log(error);
            } else {
              // emit the chat to the guest
              socket.emit(CHATLOG, chat);
              // join the chat and return the chat
              socket.join(chat._id);
            }
          });
        } else {
          // already has a chat
          // emit the chat to the guest
          socket.emit(CHATLOG, chat);
          // join the chat and return the chat
          socket.join(chat._id);
        }
        // ===================STAFF MEMBERS =====================
      } else if (
        user.user_type === USER_TYPES.ADMIN ||
        user.user_type === USER_TYPES.SUPER_ADMIN ||
        user.user_type === USER_TYPES.RECEPTIONIST
      ) {
        //
        const chat = await models.Chat.findById({
          _id: data.chat_id,
        });
        //check if you are the member or if no staff member
        if (!chat.staff_member || chat.staff_member.id === user._id) {
          // join the room
          socket.join(chat._id);
          socket.emit(CHATLOG, chat);
          // if joining change the staff_member
          if (!chat.staff_member) {
            chat.staff_member = { id: user._id, name: user.name };
            chat.save();
          }
        }
      }
    });
    socket.on(MESSAGE, async data => {
      io.in(data.chat_id).emit('message', {
        sender: data.user,
        text: data.text,
      });
      const chat = await models.Chat.findById({ _id: data.chat_id });
      chat.tickets[chat.tickets.length - 1].messages.push({
        sender: data.sender, // needs a name and id
        text: data.text, // string
      });
      chat.save();
    });
  });
}

const JOIN = 'join';
const MESSAGE = 'message';
const CHATLOG = 'chat_log';
