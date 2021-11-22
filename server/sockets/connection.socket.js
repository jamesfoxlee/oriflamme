const SOCKET_EVENTS = require('../config/socket.constants');
const LobbyManager = require('../controllers/lobby-manager.controller');
const registerLobbyEventHandlers = require('./lobby.socket');

const { CONNECTIVITY, LOBBY } = SOCKET_EVENTS;

const lobbyManager = LobbyManager();

function registerConnectionEventHandlers (socketServer) {

  socketServer.on(CONNECTIVITY.CONNECTION, (socket) => {
    console.log(socket.id)
    socket.join('lobby');
    registerLobbyEventHandlers(lobbyManager, socket, socketServer);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());

    socket.on(CONNECTIVITY.DISCONNECTING, (reason) => {
      socket.leave('lobby');
      lobbyManager.leaveAllRooms(socket);
      socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
    });
  });

  // DEBUG
  socketServer.of("/").adapter.on("create-room", (room) => {  console.log(`create-room: ${room} was created`);});
  socketServer.of("/").adapter.on("join-room", (room, id) => {
    if (room !== id) {
      // don't log if socket joining its "own" room
      console.log(`${room} was joined by id: ${id}`);
    }
  });
  socketServer.of("/").adapter.on("leave-room", (room, id) => {
    if (room !== id) {
      // don't log if socket joining its "own" room
      console.log(`${room} was left by id: ${id}`);
    }
  });
}

module.exports = registerConnectionEventHandlers;