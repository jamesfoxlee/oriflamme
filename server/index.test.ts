const { createServer } = require("http");
const Client = require("socket.io-client");
import {SOCKET_EVENTS} from './config/socket.constants';
import LobbyManager from './controllers/lobby-manager.controller';
import { Server, Socket} from "socket.io";
import {Room} from './types/index'

describe("Oriflamme backend", () => {

  const { LOBBY } = SOCKET_EVENTS;  
  let io:Server, serverSocket:Socket, clientSocket:Server;
 
  const mockRoom= {
      roomId:"1",
      started:false,
      ownerId: "test",
      ownerName:"Testingo Testy",
      roomName: "Testingo Testy's game",
      players:[{
        color: "red",
        discardPile: ["test"],
        hand: ["card"],
        id: "1",
        imageUrl: "img",
        influence: 0,
        name: "test",
        roomId: "1",
        socketId:"1",
      }] 
    }
  const lobbyManager = LobbyManager();
  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  test("Checking socket conection", (done) => {
    serverSocket.on(LOBBY.ROOM_CREATE, (arg:Room) => {
      expect(arg).toEqual(mockRoom);
      done();
    });
    clientSocket.emit(LOBBY.ROOM_CREATE, mockRoom);
  });

  test("should create a Room and be able to check it)", async () => {

   const newRoom= await lobbyManager.createRoom(mockRoom);
   const allRooms= lobbyManager.getRooms();

    expect(allRooms[0].roomId).toBe(newRoom);

  });
});