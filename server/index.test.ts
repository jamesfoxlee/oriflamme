const { createServer } = require("http");
const Client = require("socket.io-client");
const SOCKET_EVENTS = require('./config/socket.constants');
const { LOBBY } = SOCKET_EVENTS;
const LobbyManager = require('./controllers/lobby-manager.controller');
import { Server, Socket} from "socket.io";
describe("Oriflamme backend", () => {
  let io:Server, serverSocket:Socket, clientSocket:Server;
  type MockRoom={
    ownerId:string;
    ownerName: string;
    roomName: string;
  }
  



  const mockRoom= {
      ownerId: "test",
      ownerName:"Testingo Testy",
      roomName: "Testingo Testy's game"  
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
    serverSocket.on(LOBBY.ROOM_CREATE, (arg:MockRoom) => {
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