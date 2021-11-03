module.exports = function registerRoomEventHandlers (socket, roomsManager) {

  socket.on('rooms-get', (cb) => {
    console.log('EVENT(rooms-get)');
    const rooms = roomsManager.getRooms();
    console.log(rooms);
    cb(roomsManager.getRooms());
  });

};