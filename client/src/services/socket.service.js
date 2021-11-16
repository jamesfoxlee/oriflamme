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

    function queueNoReveal (qri) {
      console.log('EMITTING EVENT: ', GAME.RESOLUTION.QUEUE.NO_REVEAL);
      socket.emit(GAME.RESOLUTION.QUEUE.NO_REVEAL, qri);
    }

    function queueReveal (qri) {
      console.log('EMITTING EVENT: ', GAME.RESOLUTION.QUEUE.REVEAL);
      socket.emit(GAME.RESOLUTION.QUEUE.REVEAL, qri);
    }

    function queueConfirmTarget (targetIndex) {
      console.log('EMITTING EVENT: ', GAME.RESOLUTION.QUEUE.CONFIRM_TARGET);
      socket.emit(GAME.RESOLUTION.QUEUE.CONFIRM_TARGET, targetIndex);
    }

    function queueConfirmTargetSelf () {
      console.log('EMITTING EVENT: ', GAME.RESOLUTION.QUEUE.CONFIRM_TARGET_SELF);
      socket.emit(GAME.RESOLUTION.QUEUE.CONFIRM_TARGET_SELF);
    }

    function queueConfirmNoTarget () {
      console.log('EMITTING EVENT: ', GAME.RESOLUTION.QUEUE.CONFIRM_NO_TARGET);
      socket.emit(GAME.RESOLUTION.QUEUE.CONFIRM_NO_TARGET);
    }

    function queueConfirmInterrupt () {
      console.log('EMITTING EVENT: ', GAME.RESOLUTION.QUEUE.CONFIRM_INTERRUPT);
      socket.emit(GAME.RESOLUTION.QUEUE.CONFIRM_INTERRUPT);
    }

    function queueConfirmDiscard (discardIndex) {
      console.log('EMITTING EVENT: ', GAME.RESOLUTION.QUEUE.CONFIRM_DISCARD);
      socket.emit(GAME.RESOLUTION.QUEUE.CONFIRM_DISCARD, discardIndex);
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

    const socket = io('http://localhost:7777');

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
        queueNoReveal,
        queueReveal,
        queueConfirmTarget,
        queueConfirmTargetSelf,
        queueConfirmNoTarget,
        queueConfirmInterrupt,
        queueConfirmDiscard,
        sendMessage,
      })
    });

    socket.on(CONNECTIVITY.DISCONNECT, () => {
      console.log(`Socket() disconnected from server`)
    });
  });
}