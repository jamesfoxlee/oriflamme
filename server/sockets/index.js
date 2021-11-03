const RoomsManager = require('../models/rooms-manager.model');
const registerRoomsEventHandlers = require('./rooms.socket');
const registerGameEventHandlers = require('./game.socket');

const roomsManager = RoomsManager();

function registerConnectionHandlers (socketServer) {
  // when there is a new connection, register handlers on the socket
  socketServer.on('connection', (socket) => {
    // console.log(`client connection, socket.id: ${socket.id}`);
    const gameId = roomsManager.addToRoom(socket);

    registerRoomsEventHandlers(socket, roomsManager);
    // registerGameEventHandlers(socket, gameManager);
    socket.on('disconnecting', (reason) => {
      roomsManager.removeFromRoom(socket);
    });
  });

  // DEBUG
  socketServer.of("/").adapter.on("connection", (room) => {  console.log(`connection: ${room} was created`);});
  socketServer.of("/").adapter.on("create-room", (room) => {  console.log(`create-room: ${room} was created`);});
}

module.exports = registerConnectionHandlers;