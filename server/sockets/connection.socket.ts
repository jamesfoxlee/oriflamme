import { Server, Socket } from "socket.io";
import { SOCKET_EVENTS } from '../config/socket.constants';
import LobbyManager from '../controllers/lobby-manager.controller';
import { LobbyManagerType } from '../types/index';
import { registerLobbyEventHandlers } from './lobby.socket';

const { CONNECTIVITY, LOBBY } = SOCKET_EVENTS;

const lobbyManager: LobbyManagerType = LobbyManager();

export default function registerConnectionEventHandlers (socketServer: Server) {

  socketServer.on(CONNECTIVITY.CONNECTION, (socket:Socket) => {
    console.log(socket.id)
    socket.join('lobby');
    registerLobbyEventHandlers(lobbyManager, socket, socketServer);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());

    socket.on(CONNECTIVITY.DISCONNECTING, () => {
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

// module.exports = registerConnectionEventHandlers;