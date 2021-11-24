import React, { useState, useEffect } from "react";

import "./App.css";
import Game from "./views/Game/Game";
import Rooms from "./organisms/Rooms/Rooms";
import Nav from "./molecules/Nav/Nav";
import Loading from "./atoms/Loading/Loading";
import Splash from "./atoms/Splash/Splash";
import Socket, { SocketFunctionTypes } from "./services/socket.service";
import StorageService from "./services/storage.service";
import { SocketProvider } from "./context/socket.context";
import { UserProvider } from "./context/user.context";
import { SOCKET_EVENTS } from "./config/socket.constants";
import { PlayerType, User } from "./types";

const { LOBBY } = SOCKET_EVENTS;

const storageService = StorageService();
export let socket: SocketFunctionTypes;
function App() {
  // "METHODS"

  const joinRoom = (roomId: null, player: PlayerType) => {
    socket.registerOneShotListener(LOBBY.GAME_STARTING, handleGameStarting);
    socket.joinRoom(roomId, player);
    setActiveRoomId(roomId);
  };

  const leaveRoom = (roomId: null, player: PlayerType) => {
    socket.leaveRoom(roomId, player);
    setActiveRoomId(null);
  };

  const startGame = (roomId: null) => {
    socket.startGame(roomId);
  };

  const handleGameStarting = () => {
    setGameStarted(true);
  };

  const [showSplash, setShowSplash] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>({ id: "", name: "" });
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    Socket()
      .then((wrappedSocket) => {
        socket = wrappedSocket;
        const userId = storageService.get("user.id");
        const userName = storageService.get("user.name");
        const socketId = socket.getSocketId();

        if (!userId) {
          storageService.set("user.id", socketId);
        }
        setUser({
          id: userId || socketId,
          name: userName,
        });
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="app" id="app">
      {showSplash ? (
        <Splash show={showSplash} dismiss={() => setShowSplash(false)} />
      ) : null}
      <SocketProvider value={socket}>
        <UserProvider value={[user, setUser]}>
          <Nav />
          {loading ? <Loading message={"Connecting"} /> : null}
          {!loading && !gameStarted ? (
            <Rooms
              activeRoomId={activeRoomId}
              joinRoom={joinRoom}
              leaveRoom={leaveRoom}
              setActiveRoomId={setActiveRoomId}
              startGame={startGame}
            />
          ) : null}
          {!loading && gameStarted ? <Game /> : null}
        </UserProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
