import io from 'socket.io-client';

import { SOCKET_EVENTS } from '../config/socket.constants';
const { CONNECTIVITY, LOBBY, MESSAGE } = SOCKET_EVENTS;

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

    function unregisterListener (event) {
      console.log(`Socket.unregisterListener() ${event}`);
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
      socket.emit(LOBBY.JOIN_ROOM, roomId, player);
    }

    function sendMessage (message) {
      console.log(MESSAGE.CREATE);
      socket.emit(MESSAGE.CREATE, message);
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
        unregisterListener,
        getSocketId,
        getRooms,
        createRoom,
        joinRoom,
        sendMessage
      })
    });

    socket.on(CONNECTIVITY.DISCONNECT, () => {
      console.log(`Socket() disconnected from server`)
    });
  });
}