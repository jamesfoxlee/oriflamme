const { v1: uuidv1 } = require('uuid');

const { Room } = require('../models/room.model');

module.exports = function LobbyManager () {
  const _rooms = {};

  const _getNumberOfRooms = () => Object.keys(_rooms).length;

  const getRooms = () => {
    return Object.values(_rooms).map(room => {
      const { roomId, ownerId, ownerName, roomName, players, started } = room;
      return {
        roomId,
        ownerId,
        ownerName,
        roomName,
        players,
        started
      }
    });
  };

  const createRoom = async (roomData) => {
    console.log('LobbyManager.createRoom()')
    try {
      const roomId = uuidv1();
      // NB roomData sent by client: { ownerId, ownerName, roomName }
      const room = {
        ...roomData,
        roomId: roomId,
        players: [],
        started: false
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
    console.log(`LobbyManager.joinRoom() with roomId: ${roomId}`);
    const room = _rooms[roomId];
    socket.join(roomId);
    room.players.push({
      ...player,
      socketId: socket.id
    });
    console.log(`number of players now in room: ${room.players.length}`);
  };

  const leaveRoom = (roomId, socket, leavingPlayer) => {
    console.log(`LobbyManager.leaveRoom() with roomId: ${roomId}`);
    socket.leave(roomId);
    let room = _rooms[roomId];
    if (room.players.length === 1) {
      delete _rooms[roomId];
    } else {
      const updated = {...room};
      updated.players = room.players.filter((player) => player.id !== leavingPlayer.id);
      if (leavingPlayer.id === room.ownerId) {
        updated.ownerId = updated.players[0].id;
        updated.ownerName = updated.players[0].name;
        updated.roomName = `${updated.ownerName}'s game`;
      }
      _rooms[roomId] = updated;
    }
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
          const playerIdx = room.players.findIndex(player => player.socketId === socket.id);
          room.players = room.players.filter((_, idx) => idx !== playerIdx);
        }
      }
    }
  }

  const startGame = (roomId) => {

  }

  return {
    getRooms,
    createRoom,
    joinRoom,
    leaveRoom,
    leaveAllRooms,
    startGame
  }
};