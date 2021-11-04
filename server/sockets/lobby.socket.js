module.exports = function registerLobbyHandlers(socket, lobbyManager, socketServer) {

  socket.on('rooms-get', () => {
    console.log('EVENT(rooms-get)');
    const rooms = lobbyManager.getRooms();
    console.log(`sending ${rooms.length} rooms...`);
    socketServer.to('lobby').emit('rooms-changed', rooms);
  });

  socket.on('rooms-create', (roomData) => {
    console.log('EVENT(rooms-create)');
    console.log(`socket.id: ${socket.id}`);
    console.log(roomData);
    const roomId = lobbyManager.createRoom(roomData);
    const player = {
      id: roomData.ownerId,
      name: roomData.ownerName,
    };
    lobbyManager.joinRoom(roomId, socket, player);
    const rooms = lobbyManager.getRooms();
    console.log(`sending ${rooms.length} rooms...`);
    socketServer.to('lobby').emit('rooms-changed', rooms);
  });

};