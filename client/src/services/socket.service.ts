import io from "socket.io-client";

import { SOCKET_EVENTS } from "../config/socket.constants";
import { Card, PlayerType } from "../types";
const { CONNECTIVITY, GAME, LOBBY, MESSAGE } = SOCKET_EVENTS;

export interface SocketFunctionTypes {
  getSocketId: () => string;
  registerOneShotListener: (event: string, handler: () => void) => void;
  registerListener: (event: string, handler: () => void) => void;
  unregisterListeners: (event: string) => void;
  getRooms: () => void;
  createRoom: (roomData: string) => void;
  joinRoom: (roomId: string | null, player: PlayerType) => void;
  leaveRoom: (roomId: string | null, player: PlayerType) => void;
  startGame: (roomId: string | null) => void;
  getGameState: () => void;
  playCard: (card: Card, position: string) => void;
  queueNoReveal: (qri: number) => void;
  queueReveal: (qri: number) => void;
  queueConfirmTarget: (targetIndex: number | null) => void;
  queueConfirmTargetSelf: () => void;
  queueConfirmNoTarget: () => void;
  queueConfirmInterrupt: () => void;
  queueConfirmDiscard: (discardIndex: number) => void;
  sendMessage: (message: string) => void;
}

export default function Socket(): Promise<SocketFunctionTypes> {
  return new Promise((resolve, reject) => {
    function getSocketId() {
      return socket.id;
    }

    //----------------------------------------------------------------
    // REGISTRATION
    //----------------------------------------------------------------

    function registerOneShotListener(event: string, handler: () => void) {
      console.log(`Socket.registerOneShotListener() event: ${event}`);
      socket.once(event, handler);
    }

    function registerListener(event: string, handler: () => void) {
      console.log(`Socket.registerListener() ${event}`);
      socket.on(event, handler);
    }

    function unregisterListeners(event: string) {
      console.log(`Socket.unregisterListeners() ${event}`);
      socket.removeAllListeners(event);
    }

    //----------------------------------------------------------------
    // LOBBY
    //----------------------------------------------------------------

    function getRooms() {
      console.log("EMITTING EVENT: ", LOBBY.ROOMS_GET);
      socket.emit(LOBBY.ROOMS_GET);
    }

    function createRoom(roomData: string) {
      console.log("EMITTING EVENT: ", LOBBY.ROOM_CREATE);
      socket.emit(LOBBY.ROOM_CREATE, roomData);
    }

    function joinRoom(roomId: string | null, player: PlayerType) {
      console.log("EMITTING EVENT: ", LOBBY.ROOM_JOIN);
      socket.emit(LOBBY.ROOM_JOIN, roomId, player);
    }

    function leaveRoom(roomId: string | null, player: PlayerType) {
      console.log("EMITTING EVENT: ", LOBBY.ROOM_LEAVE);
      socket.emit(LOBBY.ROOM_LEAVE, roomId, player);
    }

    function startGame(roomId: string | null) {
      console.log("EMITTING EVENT: ", LOBBY.GAME_START);
      socket.emit(LOBBY.GAME_START, roomId);
    }

    //----------------------------------------------------------------
    // GAME
    //----------------------------------------------------------------

    function getGameState() {
      console.log("EMITTING EVENT: ", GAME.GAMESTATE_GET);
      socket.emit(GAME.GAMESTATE_GET);
    }

    function playCard(card: Card, position: string) {
      console.log("EMITTING EVENT: ", GAME.PLANNING.PLAY_CARD);
      socket.emit(GAME.PLANNING.PLAY_CARD, card, position);
    }

    function queueNoReveal(qri: number) {
      console.log("EMITTING EVENT: ", GAME.RESOLUTION.QUEUE.NO_REVEAL);
      socket.emit(GAME.RESOLUTION.QUEUE.NO_REVEAL, qri);
    }

    function queueReveal(qri: number) {
      console.log("EMITTING EVENT: ", GAME.RESOLUTION.QUEUE.REVEAL);
      socket.emit(GAME.RESOLUTION.QUEUE.REVEAL, qri);
    }

    function queueConfirmTarget(targetIndex: number | null) {
      console.log("EMITTING EVENT: ", GAME.RESOLUTION.QUEUE.CONFIRM_TARGET);
      socket.emit(GAME.RESOLUTION.QUEUE.CONFIRM_TARGET, targetIndex);
    }

    function queueConfirmTargetSelf() {
      console.log(
        "EMITTING EVENT: ",
        GAME.RESOLUTION.QUEUE.CONFIRM_TARGET_SELF
      );
      socket.emit(GAME.RESOLUTION.QUEUE.CONFIRM_TARGET_SELF);
    }

    function queueConfirmNoTarget() {
      console.log("EMITTING EVENT: ", GAME.RESOLUTION.QUEUE.CONFIRM_NO_TARGET);
      socket.emit(GAME.RESOLUTION.QUEUE.CONFIRM_NO_TARGET);
    }

    function queueConfirmInterrupt() {
      console.log("EMITTING EVENT: ", GAME.RESOLUTION.QUEUE.CONFIRM_INTERRUPT);
      socket.emit(GAME.RESOLUTION.QUEUE.CONFIRM_INTERRUPT);
    }

    function queueConfirmDiscard(discardIndex: number) {
      console.log("EMITTING EVENT: ", GAME.RESOLUTION.QUEUE.CONFIRM_DISCARD);
      socket.emit(GAME.RESOLUTION.QUEUE.CONFIRM_DISCARD, discardIndex);
    }

    //----------------------------------------------------------------
    // MESSAGING
    //----------------------------------------------------------------

    function sendMessage(message: string) {
      console.log("EMITTING EVENT: ", MESSAGE.CREATE);
      socket.emit(MESSAGE.CREATE, message);
    }

    //----------------------------------------------------------------
    // INITIALISE SOCKET
    //----------------------------------------------------------------

    const socket = io("http://localhost:7777");

    socket.on(CONNECTIVITY.CONNECT, () => {
      console.log(`Socket() connected to server, socket.id: ${socket.id}`);
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
      });
    });

    socket.on(CONNECTIVITY.DISCONNECT, () => {
      console.log(`Socket() disconnected from server`);
    });
  });
}
