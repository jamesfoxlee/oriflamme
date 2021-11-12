const SOCKET_EVENTS = require('../config/socket.constants');
const { GAME, MESSAGE } = SOCKET_EVENTS;

module.exports = function registerGameEventHandlers (roomId, gameManager, socket, socketServer) {

  socket.on(GAME.GAMESTATE_GET, () => {
    console.log('EVENT RECEIVED: ', GAME.GAMESTATE_GET);
    socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
  });

  socket.on(GAME.PLANNING.PLAY_CARD, (card, position) => {
    console.log('EVENT RECEIVED: ', GAME.PLANNING.PLAY_CARD);
    console.log(`playing ${card.name} to position: ${position}`);
    gameManager.playCard(card, position);
    socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
  });

  socket.on(MESSAGE.CREATE, (message) => {
    console.log('EVENT RECEIVED: ', MESSAGE.CREATE);
    console.log(message);
  });

};