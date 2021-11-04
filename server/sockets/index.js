const SOCKET_CONSTANTS = require('../config/socket.constants');
const LobbyManager = require('../models/lobby-manager.model');
const registerLobbyHandlers = require('./lobby.socket');
const registerGameEventHandlers = require('./game.socket');

const { CONNECTIVITY } = SOCKET_CONSTANTS.EVENTS;

const lobbyManager = LobbyManager();

function registerConnectionHandlers (socketServer) {

  socketServer.on(CONNECTIVITY.CONNECTION, (socket) => {
    socket.join('lobby');
    registerLobbyHandlers(socket, lobbyManager, socketServer);
    // registerGameEventHandlers(socket, gameManager);

    socket.on(CONNECTIVITY.DISCONNECT, (reason) => {
      socket.leave('lobby');
      lobbyManager.leaveRoom(socket);
      socketServer.to('lobby').emit('rooms-changed', lobbyManager.getRooms());
    });
  });

  // DEBUG
  socketServer.of("/").adapter.on("leave-room", (room) => {  console.log(`${room} was left`);});
  socketServer.of("/").adapter.on("create-room", (room) => {  console.log(`create-room: ${room} was created`);});
}

module.exports = registerConnectionHandlers;