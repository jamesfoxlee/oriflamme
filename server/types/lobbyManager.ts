import { Player, Room } from './index';
import { Server, Socket } from "socket.io";

export type LobbyManagerType = {
    getRooms: ()=>Room[];
    createRoom:(roomData: Room)=>void;
    joinRoom: (roomId: string, socket: Socket, player: Player)=>void;
    leaveRoom: (roomId: string, socket: Socket, player: Player)=>void;
    leaveAllRooms: (socket:Socket)=>void;
    startGame: (roomId: string, socketServer: Server)=>void;
  }