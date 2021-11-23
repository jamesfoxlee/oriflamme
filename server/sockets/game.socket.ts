import  {SOCKET_EVENTS} from '../config/socket.constants';
import { Card } from "../types/index";
import { GameManager as GMType } from "../types/index";
import { Server, Socket,RemoteSocket } from "socket.io";
import { DefaultEventsMap, EventsMap } from 'socket.io/dist/typed-events';
const { GAME, MESSAGE } = SOCKET_EVENTS;

export default async function registerGameEventHandlers (roomId:string, gameManager:GMType, socketServer:Server) {

  try {
    
    const socketsInRoom = await socketServer.in(roomId).fetchSockets();
     socketsInRoom.forEach((socket:any)=>{

      socket.on(GAME.GAMESTATE_GET, () => {
        console.log('EVENT RECEIVED: ', GAME.GAMESTATE_GET);
        socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
      });

      socket.on(GAME.PLANNING.PLAY_CARD, (card:Card, position:number) => {
        console.log('EVENT RECEIVED: ', GAME.PLANNING.PLAY_CARD);
        gameManager.cardWasPlayed(card, position);
        socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
      });

      socket.on(GAME.RESOLUTION.QUEUE.NO_REVEAL, (qri:number) => {
        console.log('EVENT RECEIVED: ', GAME.RESOLUTION.QUEUE.NO_REVEAL);
        gameManager.cardWasNotRevealed(qri);
        socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
      });

      socket.on(GAME.RESOLUTION.QUEUE.REVEAL, (qri:number) => {
        console.log('EVENT RECEIVED: ', GAME.RESOLUTION.QUEUE.REVEAL);
        gameManager.cardWasRevealed(qri);
        socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
      });

      socket.on(GAME.RESOLUTION.QUEUE.CONFIRM_TARGET, (targetIndex:number) => {
        console.log('EVENT RECEIVED: ', GAME.RESOLUTION.QUEUE.CONFIRM_TARGET);
        gameManager.targetWasConfirmed(targetIndex);
        socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
      });

      socket.on(GAME.RESOLUTION.QUEUE.CONFIRM_TARGET_SELF, () => {
        console.log('EVENT RECEIVED: ', GAME.RESOLUTION.QUEUE.CONFIRM_TARGET_SELF);
        gameManager.targetSelfWasConfirmed();
        socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
      });

      socket.on(GAME.RESOLUTION.QUEUE.CONFIRM_NO_TARGET, () => {
        console.log('EVENT RECEIVED: ', GAME.RESOLUTION.QUEUE.CONFIRM_NO_TARGET);
        gameManager.noValidTargetWasConfirmed();
        socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
      });

      socket.on(GAME.RESOLUTION.QUEUE.CONFIRM_INTERRUPT, () => {
        console.log('EVENT RECEIVED: ', GAME.RESOLUTION.QUEUE.CONFIRM_INTERRUPT);
        gameManager.interruptWasConfirmed();
        socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
      });

      socket.on(GAME.RESOLUTION.QUEUE.CONFIRM_DISCARD, (discardIndex:number) => {
        console.log('EVENT RECEIVED: ', GAME.RESOLUTION.QUEUE.CONFIRM_DISCARD);
        gameManager.discardWasConfirmed(discardIndex);
        socketServer.to(roomId).emit(GAME.GAMESTATE_CHANGED, gameManager.getGameState());
      });
      //----------------------------------------------------------------
      // MESSAGES
      //----------------------------------------------------------------


      socket.on(MESSAGE.CREATE, (message:string) => {
        console.log('EVENT RECEIVED: ', MESSAGE.CREATE);
        console.log(message);
      });
    })
  } catch (err) {
    console.error('ERROR registerGameEventHandlers() : ', err);
  }
};