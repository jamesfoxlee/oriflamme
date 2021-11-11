const SOCKET_EVENTS = require('../config/socket.constants');
const { LOBBY, GAME } = SOCKET_EVENTS;

module.exports = function registerLobbyEventHandlers(lobbyManager, socket, socketServer) {

  socket.on(LOBBY.ROOMS_GET, () => {
    console.log('EVENT RECEIVED: ', LOBBY.ROOMS_GET);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

  socket.on(LOBBY.ROOM_CREATE, async (roomData) => {
    console.log('EVENT RECEIVED: ', LOBBY.ROOM_CREATE);
    const roomId = await lobbyManager.createRoom(roomData);
    socket.emit(LOBBY.ROOM_CREATED, roomId);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

  socket.on(LOBBY.ROOM_JOIN, (roomId, player) => {
    console.log('EVENT RECEIVED: ', LOBBY.ROOM_JOIN);
    console.log(`${player.name} with id: ${player.id} joining room: ${roomId}`);
    lobbyManager.joinRoom(roomId, socket, player);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

  socket.on(LOBBY.ROOM_LEAVE, (roomId, player) => {
    console.log('EVENT RECEIVED: ', LOBBY.ROOM_LEAVE);
    console.log(`${player.name} with id: ${player.id} leaving room: ${roomId}`);
    lobbyManager.leaveRoom(roomId, socket, player);
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
  });

  socket.on(LOBBY.GAME_START, async (roomId) => {
    console.log('EVENT RECEIVED: ', LOBBY.GAME_START);
    console.log(`Starting game for roomId: ${roomId}`);
    socketServer.to(roomId).emit(LOBBY.GAME_STARTING);
    await lobbyManager.startGame(roomId, socket, socketServer);
    // TODO: fix, could cause a race as people can still join while game spinning up
    socketServer.to('lobby').emit(LOBBY.ROOMS_CHANGED, lobbyManager.getRooms());
    socketServer.to(roomId).emit(LOBBY.GAME_STARTED);
  });
};