import io from 'socket.io-client';

import SOCKET_CONSTANTS from '../config/socket.constants';
const { CONNECTIVITY, LOBBY, MESSAGE } = SOCKET_CONSTANTS.EVENTS;

export default function Socket() {

  return new Promise ((resolve, reject) => {

    function registerOneShotListener (event, handler) {
      console.log(`Socket.registerOneShotListener() event: ${event}`);
      socket.once(event, handler);
    }

    function registerListener (event, handler) {
      console.log(`Socket.registerListener() event: ${event}`);
      socket.on(event, handler);
    }

    function unregisterListener (event) {
      console.log(`Socket.unregisterListener() event: ${event}`);
      socket.removeAllListeners(event);
    }

    function getSocketId () {
      return socket.id;
    }

    function getRooms () {
      console.log(`Socket.getRooms()`);
      socket.emit(LOBBY.GET_ROOMS);
    }

    function createRoom (roomData) {
      console.log(`Socket.createRoom()`);
      socket.emit(LOBBY.CREATE_ROOM, roomData);
    }

    function sendMessage (message) {
      console.log(`Socket.sendMessage() message: ${message}`);
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
        sendMessage
      })
    });

    socket.on(CONNECTIVITY.DISCONNECT, () => {
      console.log(`Socket() disconnected from server`)
    });
  });
}