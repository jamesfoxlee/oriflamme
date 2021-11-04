const SOCKET_CONSTANTS = require('../config/socket.constants');
const { LOBBY } = SOCKET_CONSTANTS.EVENTS;

module.exports = function registerLobbyHandlers(socket, lobbyManager, socketServer) {

  socket.on(LOBBY.GET_ROOMS, () => {
    console.log('LOBBY.GET_ROOMS');
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

  socket.on(LOBBY.CREATE_ROOM, (roomData) => {
    console.log(LOBBY.CREATE_ROOM);
    const roomId = lobbyManager.createRoom(roomData);
    const player = {
      id: roomData.ownerId,
      name: roomData.ownerName,
    };
    lobbyManager.joinRoom(roomId, socket, player);
    socket.emit(LOBBY.CREATE_ROOM_SUCCESS, roomId);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

};