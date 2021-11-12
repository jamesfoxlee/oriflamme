import io from 'socket.io-client';

import { SOCKET_EVENTS } from '../config/socket.constants';
const { CONNECTIVITY, GAME, LOBBY, MESSAGE } = SOCKET_EVENTS;

export default function Socket() {

  return new Promise ((resolve, reject) => {

    function getSocketId () {
      return socket.id;
    }

    //----------------------------------------------------------------
    // REGISTRATION
    //----------------------------------------------------------------

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

    //----------------------------------------------------------------
    // LOBBY
    //----------------------------------------------------------------

    function getRooms () {
      console.log('EMITTING EVENT: ', LOBBY.ROOMS_GET);
      socket.emit(LOBBY.ROOMS_GET);
    }

    function createRoom (roomData) {
      console.log('EMITTING EVENT: ', LOBBY.ROOM_CREATE);
      socket.emit(LOBBY.ROOM_CREATE, roomData);
    }

    function joinRoom (roomId, player) {
      console.log('EMITTING EVENT: ', LOBBY.ROOM_JOIN);
      socket.emit(LOBBY.ROOM_JOIN, roomId, player);
    }

    function leaveRoom (roomId, player) {
      console.log('EMITTING EVENT: ', LOBBY.ROOM_LEAVE);
      socket.emit(LOBBY.ROOM_LEAVE, roomId, player);
    }

    function startGame (roomId) {
      console.log('EMITTING EVENT: ', LOBBY.GAME_START);
      socket.emit(LOBBY.GAME_START, roomId);
    }

    //----------------------------------------------------------------
    // GAME
    //----------------------------------------------------------------

    function getGameState () {
      console.log('EMITTING EVENT: ', GAME.GAMESTATE_GET);
      socket.emit(GAME.GAMESTATE_GET);
    }

    function playCard (card, position) {
      console.log('EMITTING EVENT: ', GAME.PLANNING.PLAY_CARD);
      socket.emit(GAME.PLANNING.PLAY_CARD, card, position);
    }

    //----------------------------------------------------------------
    // MESSAGING
    //----------------------------------------------------------------


    function sendMessage (message) {
      console.log('EMITTING EVENT: ', MESSAGE.CREATE);
      socket.emit(MESSAGE.CREATE, message);
    }

    //----------------------------------------------------------------
    // INITIALISE SOCKET
    //----------------------------------------------------------------

    const socket = io('http://localhost:19126');

    socket.on(CONNECTIVITY.CONNECT, () => {
      console.log(`Socket() connected to server, socket.id: ${socket.id}`)
      resolve({
        getSocketId,
        registerOneShotListener,
        registerListener,
        unregisterListeners,
        getRooms,
        createRoom,
        joinRoom,
        leaveRoom,
        startGame,
        getGameState,
        playCard,
        sendMessage,
      })
    });

    socket.on(CONNECTIVITY.DISCONNECT, () => {
      console.log(`Socket() disconnected from server`)
    });
  });
}