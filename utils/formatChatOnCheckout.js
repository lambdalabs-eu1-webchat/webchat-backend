const formatChatOnCheckout = rawChatHistory => {
  const gatherChat = rawChatHistory.tickets.map(ticket =>
    ticket.messages.map(message => `${message.sender.name}: ${message.text}`),
  );
  const mergeTickets = [].concat.apply([], gatherChat);
  return mergeTickets;
};

module.exports = formatChatOnCheckout;
