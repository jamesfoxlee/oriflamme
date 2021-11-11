const SOCKET_EVENTS = require('../config/socket.constants');
const { GAME } = SOCKET_EVENTS;

module.exports = function registerGameEventHandlers (socket, gameManager, socketServer) {

  socket.on('message-post', (message) => {
    console.log(`EVENT(message): `, message);
  });

};

// MESSAGES

// socket.on('message-post', (message) => {
//   console.log(`EVENT(message): `, message);
// });