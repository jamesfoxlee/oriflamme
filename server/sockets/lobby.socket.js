const SOCKET_EVENTS = require('../config/socket.constants');
const { LOBBY, GAME } = SOCKET_EVENTS;

module.exports = function registerLobbyEventHandlers(socket, lobbyManager, socketServer) {

  socket.on(LOBBY.GET_ROOMS, () => {
    console.log(LOBBY.GET_ROOMS);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

  socket.on(LOBBY.CREATE_ROOM, async (roomData) => {
    console.log(LOBBY.CREATE_ROOM);
    const roomId = await lobbyManager.createRoom(roomData);
    socket.emit(LOBBY.CREATE_ROOM_SUCCESS, roomId);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

  socket.on(LOBBY.JOIN_ROOM, (roomId, player) => {
    console.log(LOBBY.JOIN_ROOM);
    console.log(`${player.name} with id: ${player.id} joining room: ${roomId}`);
    lobbyManager.joinRoom(roomId, socket, player);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

  socket.on(LOBBY.LEAVE_ROOM, (roomId, player) => {
    console.log(LOBBY.LEAVE_ROOM);
    console.log(`${player.name} with id: ${player.id} leaving room: ${roomId}`);
    lobbyManager.leaveRoom(roomId, socket, player);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

  socket.on(LOBBY.START_GAME, (roomId) => {
    console.log(LOBBY.START_GAME);
    console.log(`Starting game for roomId: ${roomId}`);
    socketServer.to(roomId).emit(GAME.GAME_STARTING)
    // lobbyManager.startGame(roomId, socket);
    // socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

};