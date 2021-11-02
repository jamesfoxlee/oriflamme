const { socketDisconnecting, socketDisconnect } = require('./connection');
const GameManager = require('../models/game-manager');

const gameManager = GameManager();

function registerSocketEventHandlers (socketServer) {
  // when there is a new connection, register handlers on the socket
  socketServer.on('connection', (socket) => {
    console.log(`client connection, socket.id: ${socket.id}`);
    gameManager.addToGame(socket);
    // TODO: 'disconnecting' event doesn't pass socket to callback, need closure
    // currently passes reason (string)
    socket.on('disconnecting', socketDisconnecting);
    socket.on('disconnect', socketDisconnect);
  });

  // DEBUG
  socketServer.of("/").adapter.on("create-room", (room) => {  console.log(`room ${room} was created`);});
}

module.exports = registerSocketEventHandlers;