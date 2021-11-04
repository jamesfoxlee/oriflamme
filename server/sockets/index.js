const LobbyManager = require('../models/lobby-manager.model');
const registerLobbyHandlers = require('./lobby.socket');
const registerGameEventHandlers = require('./game.socket');

const lobbyManager = LobbyManager();

function registerConnectionHandlers (socketServer) {
  // when there is a new connection, register hand                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            lers on the socket
  socketServer.on('connection', (socket) => {
    socket.join('lobby');
    registerLobbyHandlers(socket, lobbyManager, socketServer);
    // registerGameEventHandlers(socket, gameManager);

    socket.on('disconnecting', (reason) => {
      socket.leave('lobby');
      lobbyManager.leaveRoom(socket);
    });
  });

  // DEBUG
  socketServer.of("/").adapter.on("connection", (room) => {  console.log(`connection: ${room} was created`);});
  socketServer.of("/").adapter.on("create-room", (room) => {  console.log(`create-room: ${room} was created`);});
}

module.exports = registerConnectionHandlers;