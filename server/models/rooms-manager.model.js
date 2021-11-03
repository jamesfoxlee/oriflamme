const { v1: uuidv1 } = require('uuid');

module.exports = function RoomsManager () {
  const _rooms = {};

  const _getNumberOfRooms = () => Object.keys(_rooms).length;

  const _createRoom = (roomId) => {
    _rooms[roomId] = {
      id: roomId,
      numSockets: 0,
      sockets: {},
    };
    return roomId;
  };

  const getRooms = () => {
    return Object.values(_rooms).map(room => {
      const { id, numSockets } = room;
      return {
        id,
        numPlayers: numSockets
      }
    });
  };

  const addToRoom = (socket, id) => {
    // TODO: limit adding if > 5 players
    const roomId = id || Object.keys(_rooms)[0] || uuidv1();
    console.log(`addToRoom() adding socket to room with roomId: ${roomId}`);
    if (!_rooms[roomId]) {
      _createRoom(roomId);
      console.log('rooms running: ', _getNumberOfRooms());
    }
    const room = _rooms[roomId];
    room.sockets[socket.id] = socket;
    socket.join(roomId);
    room.numSockets += 1;
    console.log(`number of sockets now in room: ${room.numSockets}`);
    return roomId;
  };

  const removeFromRoom = (socket) => {
    console.log(`removeFromRoom() for socket.id: ${socket.id}`);
    for (let roomId of socket.rooms) {
      if (roomId !== socket.id) {
        const room = _rooms[roomId];
        if (room.numSockets === 1) {
          delete _rooms[roomId];
          console.log('rooms running: ', _getNumberOfRooms());
        } else {
          delete room.sockets[socket.id];
          room.numSockets -= 1;
          console.log(`number of sockets in room: ${room.numSockets}`);
        }
      }
    }
  }

  return {
    getRooms,
    addToRoom,
    removeFromRoom
  }
};