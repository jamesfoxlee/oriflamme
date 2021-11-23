import { Server, Socket } from "socket.io";
import { Player } from "../types/player";
import { Room } from "../types/index";
import  { Room as RoomModel } from '../models/room.model';
const { v1: uuidv1 } = require('uuid');

const registerGameEventHandlers = require('../sockets/game.socket');
const GameManager = require('./game-manager.controller');



type RoomData={
  roomName: string,
  ownerName: string,
  ownerId: string,
}

interface Rooms{
 [id:string]: Room
}


export default function LobbyManager(){

  const _rooms:Rooms = {};
  const _gameManagers = {};

  // "METHODS"

  // const _getNumberOfRooms = () => Object.keys(_rooms).length;

  const getRooms = () => {
    return Object.values(_rooms).map((room:Room) => {
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

  const createRoom = async (roomData:RoomData) => {
    console.log('LobbyManager.createRoom()')
    try {
      const roomId = uuidv1();
      // NB roomData sent by client: { ownerId, ownerName, roomName }
      const room = {
        ...roomData,
        players: [],
        roomId: roomId,
        started: false
      };
      _rooms[roomId] = room;
      return roomId;
    }
    catch (err) {
      console.log(err);
    }
  };

  const joinRoom = async (roomId:string, socket:Socket, player:Player) => {
    // TODO: limit adding if > 5 players
    console.log('LobbyManager.joinRoom()');
    const room = _rooms[roomId];
    socket.join(roomId);
    room.players.push({
      ...player,
      socketId: socket.id
    });
  };

  const leaveRoom = (roomId:string, socket:Socket, leavingPlayer:Player) => {
    console.log(`LobbyManager.leaveRoom() with roomId: ${roomId}`);
    socket.leave(roomId);
    const room = _rooms[roomId];
    if (room.players.length === 1) {
      delete _gameManagers[roomId];
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

  const leaveAllRooms = (socket:Socket) => {
    console.log(`LobbyManager.leaveAllRooms() for socket.id: ${socket.id}`);
    for (let roomId of socket.rooms) {
      // no need to to delete own room of socket
      if (roomId !== socket.id) {
        console.log(`leaving room ${roomId} ...`);
        socket.leave(roomId);
        const room = _rooms[roomId];
        if (room.players.length === 1) {
          // last player is leaving - clean up room and game manager
          delete _gameManagers[roomId];
          delete _rooms[roomId];
        } else {
          room.players = room.players.filter(player => player.socketId !== socket.id);
        }
      }
    }
  }

  const startGame = async (roomId:string, socketServer:Server) => {
    try {
      const room = _rooms[roomId];
      room.started = true;
      // TODO: test that room is actually locked to other clients while all this is happening
      const gameManager = GameManager();
      gameManager.initialise(room);
      await registerGameEventHandlers(roomId, gameManager, socketServer);
      _gameManagers[roomId] = gameManager;
      const rm = new RoomModel(room);
      await rm.save();
    } catch (err) {
      console.log(err);
    }
  }

  // TODO: endGame, cleanup room and gameManager

  return {
    getRooms,
    createRoom,
    joinRoom,
    leaveRoom,
    leaveAllRooms,
    startGame
  }
};



// module.exports = LobbyManager;