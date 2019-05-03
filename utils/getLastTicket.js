module.exports = function getLastTicket(chat) {
  return chat.tickets[chat.tickets.length - 1];
};
