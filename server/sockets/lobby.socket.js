const SOCKET_EVENTS = require('../config/socket.constants');
const { LOBBY } = SOCKET_EVENTS;

module.exports = function registerLobbyEventHandlers(socket, lobbyManager, socketServer) {

  socket.on(LOBBY.GET_ROOMS, () => {
    console.log(LOBBY.GET_ROOMS);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

  socket.on(LOBBY.CREATE_ROOM, async (roomData) => {
    console.log(LOBBY.CREATE_ROOM);
    const roomId = await lobbyManager.createRoom(roomData);
    const player = {
      id: roomData.ownerId,
      name: roomData.ownerName,
    };
    // lobbyManager.joinRoom(roomId, socket, player);
    socket.emit(LOBBY.CREATE_ROOM_SUCCESS, roomId);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

  socket.on(LOBBY.JOIN_ROOM, (roomId, player) => {
    console.log(LOBBY.JOIN_ROOM);
    console.log(`${player.name} with id: ${player.id} joining room: ${roomId}`);
    console.log(player);
    lobbyManager.joinRoom(roomId, socket, player);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

};