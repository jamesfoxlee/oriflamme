import io from 'socket.io-client';

import { SOCKET_EVENTS } from '../config/socket.constants';
const { CONNECTIVITY, GAME, LOBBY, MESSAGE } = SOCKET_EVENTS;

export default function Socket() {

  return new Promise ((resolve, reject) => {

    function registerOneShotListener (event, handler) {
      console.log(`Socket.registerOneShotListener() event: ${event}`);
      socket.once(event, handler);
    }

    function registerListener (event, handler) {
      console.log(`Socket.registerListener() ${event}`);
      socket.on(event, handler);
    }

    function unregisterListeners (event) {
      console.log(`Socket.unregisterListeners() ${event}`);
      socket.removeAllListeners(event);
    }

    function getSocketId () {
      return socket.id;
    }

    function getRooms () {
      console.log(LOBBY.GET_ROOMS);
      socket.emit(LOBBY.GET_ROOMS);
    }

    function createRoom (roomData) {
      console.log(LOBBY.CREATE_ROOM);
      socket.emit(LOBBY.CREATE_ROOM, roomData);
    }

    function joinRoom (roomId, player) {
      console.log(LOBBY.JOIN_ROOM);
      console.log(`player.id: ${player.id} player.name: ${player.name}`);
      socket.emit(LOBBY.JOIN_ROOM, roomId, player);
    }

    function leaveRoom (roomId, player) {
      console.log(LOBBY.LEAVE_ROOM);
      console.log(`player.id: ${player.id} player.name: ${player.name}`);
      socket.emit(LOBBY.LEAVE_ROOM, roomId, player);
    }

    function sendMessage (message) {
      console.log(MESSAGE.CREATE);
      socket.emit(MESSAGE.CREATE, message);
    }

    function startGame (roomId) {
      console.log(LOBBY.START_GAME);
      socket.emit(LOBBY.START_GAME, roomId);
    }

    //----------------------------------------------------------------
    // INITIALISE SOCKET
    //----------------------------------------------------------------

    const socket = io('http://localhost:19126');

    socket.on(CONNECTIVITY.CONNECT, () => {
      console.log(`Socket() connected to server, socket.id: ${socket.id}`)
      resolve({
        registerOneShotListener,
        registerListener,
        unregisterListeners,
        getSocketId,
        getRooms,
        createRoom,
        joinRoom,
        leaveRoom,
        sendMessage,
        startGame
      })
    });

    socket.on(CONNECTIVITY.DISCONNECT, () => {
      console.log(`Socket() disconnected from server`)
    });
  });
}