const SOCKET_EVENTS = require('../config/socket.constants');
const { GAME, MESSAGE } = SOCKET_EVENTS;

module.exports = function registerGameEventHandlers (roomId, gameManager, socket, socketServer) {

  socket.on(GAME.GAMESTATE_GET, () => {
    console.log('EVENT RECEIVED: ', GAME.GAMESTATE_GET);
    socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
  });

  socket.on(MESSAGE.CREATE, (message) => {
    console.log(MESSAGE.CREATE);
    console.log(message);
  });

};