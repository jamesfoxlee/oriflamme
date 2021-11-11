const { v1: uuidv1 } = require('uuid');

const { Room } = require('../models/room.model');

module.exports = function LobbyManager () {
  const _rooms = {};

  const _getNumberOfRooms = () => Object.keys(_rooms).length;

  const getRooms = () => {
    return Object.values(_rooms).map(room => {
      const { roomId, ownerId, ownerName, roomName, players } = room;
      return {
        roomId,
        ownerId,
        ownerName,
        roomName,
        players
      }
    });
  };

  const createRoom = async (roomData) => {
    console.log('LobbyManager.createRoom()')
    try {
      const roomId = uuidv1();
      // roomData: { ownerId, ownerName, roomName }
      const room = {
        ...roomData,
        roomId: roomId,
        players: [],
      };
      _rooms[roomId] = room;
      // Not saving until game started!
      // const rm = new Room(room);
      // await rm.save();
      console.log('rooms now running: ', _getNumberOfRooms());
      return roomId;
    }
    catch (err) {
      console.log(err);
    }
  };

  const joinRoom = async (roomId, socket, player) => {
    // TODO: limit adding if > 5 players
    // NB not going to persist to DB here as players may come and go
    // do on game start instead
    console.log('LobbyManager.joinRoom()');
    const room = _rooms[roomId];
    socket.join(roomId);
    room.players.push({
      ...player,
      socketId: socket.id
    });
    console.log(`number of players now in room: ${room.players.length}`);
  };

  const leaveRoom = (roomId) => {

  };

  const leaveAllRooms = (socket) => {
    console.log(`LobbyManager.leaveAllRooms() for socket.id: ${socket.id}`);
    for (let roomId of socket.rooms) {
      if (roomId !== socket.id) {
        console.log(`leaving room ${roomId} ...`);
        socket.leave(roomId);
        const room = _rooms[roomId];
        if (room.players.length === 1) {
          delete _rooms[roomId];
        } else {
          console.log(`before removal, number of players in room: ${room.players.length}`);
          const playerIdx = room.players.findIndex(player => player.socketId === socket.id);
          console.log(`player found in room at index: ${playerIdx}`);
          room.players = room.players.filter((_, idx) => idx !== playerIdx);
          console.log(`player removed, number of players in room: ${room.players.length}`);
        }
      }
    }
  }

  return {
    getRooms,
    createRoom,
    joinRoom,
    leaveRoom,
    leaveAllRooms
  }
};