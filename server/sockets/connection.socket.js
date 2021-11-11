const SOCKET_EVENTS = require('../config/socket.constants');
const LobbyManager = require('../controllers/lobby-manager.controller');
const registerLobbyEventHandlers = require('./lobby.socket');

const { CONNECTIVITY, LOBBY } = SOCKET_EVENTS;

const lobbyManager = LobbyManager();

function registerConnectionEventHandlers (socketServer) {

  socketServer.on(CONNECTIVITY.CONNECTION, (socket) => {
    socket.join('lobby');
    registerLobbyEventHandlers(socket, lobbyManager, socketServer);
    // registerGameEventHandlers(socket, gameManager);

    socket.on(CONNECTIVITY.DISCONNECTING, (reason) => {
      socket.leave('lobby');
      lobbyManager.leaveAllRooms(socket);
      socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
    });
  });

  // DEBUG
  socketServer.of("/").adapter.on("leave-room", (room) => {  console.log(`${room} was left`);});
  socketServer.of("/").adapter.on("create-room", (room) => {  console.log(`create-room: ${room} was created`);});
}

module.exports = registerConnectionEventHandlers;