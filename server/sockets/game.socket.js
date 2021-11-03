module.exports = function registerGameEventHandlers (socket, gameManager) {

  socket.on('message-post', (message) => {
    console.log(`EVENT(message): `, message);
  });

};