const GameManager = require('../models/game-manager');

const gameManager = GameManager();

function registerConnectionHandlers (socketServer) {
  // when there is a new connection, register handlers on the socket
  socketServer.on('connection', (socket) => {
    // console.log(`client connection, socket.id: ${socket.id}`);
    gameManager.addToGame(socket);
    socket.on('disconnecting', (reason) => {
      gameManager.removeFromGame(socket);
    });
    // socket.on('disconnect', socketDisconnect);
  });

  // DEBUG
  socketServer.of("/").adapter.on("connection", (room) => {  console.log(`connection: ${room} was created`);});
  socketServer.of("/").adapter.on("create-room", (room) => {  console.log(`create-room: ${room} was created`);});
}

module.exports = registerConnectionHandlers;