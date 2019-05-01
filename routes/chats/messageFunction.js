module.exports = handleMessage;

const { models } = require('../../models/index');

const KEYWORDS = require('./constants');
const MESSAGE = KEYWORDS.MESSAGE;
const getLastTicket = require('../../utils/getLastTicket');
async function handleMessage(data, socket, io) {
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
}
