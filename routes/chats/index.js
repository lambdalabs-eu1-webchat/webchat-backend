const MODEL_NAMES = require('../../models/MODEL_NAMES');
const USER_TYPES = require('../../models/USER_TYPES.js');
const { models } = require('../../models/index');

const handleJoin = require('./joinFunction');

const KEYWORDS = require('./constants');
const JOIN = KEYWORDS.JOIN;
const MESSAGE = KEYWORDS.MESSAGE;
const CLOSE_TICKET = KEYWORDS.CLOSE_TICKET;

module.exports = chatSocket;

function chatSocket(io) {
  io.on('connection', async socket => {
    // for guest needs user_id
    // for employee needs user_id and chat_id
    socket.on(JOIN, data => handleJoin(data, socket));

    socket.on(MESSAGE, async data => {
      const chat = await models.Chat.findById({ _id: data.chat_id });

      const currentTicket = getLastTicket(chat);
      // if last ticket is closed make a new one
      if (currentTicket.status === 'closed') {
        const newTicket = {
          status: 'queued',
          messages: [
            {
              sender: data.user,
              text: data.text,
            },
          ],
        };
        chat.tickets.push(newTicket);
        chat.save(error => {
          if (error) {
            socket.emit('console', error);
          }
        });
        // put it to a queue
        io.in('add queue');
      }

      io.in(data.chat_id).emit('message', {
        sender: data.user,
        text: data.text,
      });

      chat.tickets[chat.tickets.length - 1].messages.push({
        sender: data.sender, // needs a name and id
        text: data.text, // string
      });
      chat.save(error => {
        socket.emit('console', 'saving message');
        socket.emit('console', error);
      });
    });
    socket.on(CLOSE_TICKET, async data => {
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
    });
  });
}

function getLastTicket(chat) {
  return chat.tickets[chat.tickets.length - 1];
}
