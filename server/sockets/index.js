const { v1: uuidv1 } = require('uuid');

const { socketDisconnecting, socketDisconnect } = require('./connection');

function _addToPool (socket) {

}

const roomManager = (function RoomManager () {
  const _rooms = {};
  return {
    createRoom: function (id) {
      _rooms[id] = {
        numSockets: 0,
        sockets: {},
      };
      return id;
    },
    addToRoom: function (socket, id) {
      const roomId = id || Object.keys(_rooms)[0] || uuidv1();
      console.log(`addToRoom() adding socket to room with roomId: ${roomId}`);
      if (!_rooms[roomId]) {
        this.createRoom(roomId);
      }
      const room = _rooms[roomId];
      room.sockets[socket.id] = socket;
      room.numSockets += 1;
      console.log(`number of sockets in room: ${room.numSockets}`);
      socket.join(roomId);
      console.log(socket.rooms)
    }
  }
})();

function registerSocketEventHandlers (socketServer) {
  // when there is a new connection, register handlers on the socket
  socketServer.on('connection', (socket) => {
    console.log(`client connection, socket.id: ${socket.id}`);
    roomManager.addToRoom(socket);
    // TODO: 'disconnecting' event doesn't pass socket to callback, need closure
    socket.on('disconnecting', socketDisconnecting);
    socket.on('disconnect', socketDisconnect);
  });

  // DEBUG
  socketServer.of("/").adapter.on("create-room", (room) => {  console.log(`room ${room} was created`);});
}

module.exports = registerSocketEventHandlers;