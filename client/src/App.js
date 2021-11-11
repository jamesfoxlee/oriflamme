import React, { useState, useEffect } from 'react';

import './App.css';
import Game from './views/Game/Game';
import Rooms from './organisms/Rooms/Rooms';
import Nav from './molecules/Nav/Nav';
import Loading from './atoms/Loading/Loading';

import Socket from './services/socket.service';
import StorageService from './services/storage.service';
import { UserProvider } from './context/user.context';
import { SOCKET_EVENTS } from './config/socket.constants';
const { GAME } = SOCKET_EVENTS;


const storageService = StorageService();
let socket;

function App() {

  const joinRoom = (roomId, player) => {
    socket.registerOneShotListener(GAME.GAME_STARTING, handleGameStarting);
    socket.joinRoom(roomId, player);
    setActiveRoomId(roomId);
  }

  const leaveRoom = (roomId, player) => {
    socket.leaveRoom(roomId, player)
    setActiveRoomId(null);
  }

  const startGame = (roomId) => {
    socket.startGame(roomId);
  }

  const handleGameStarting = () => {
    setGameStarted(true);
  };

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ id: null, name: null});
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  // const [gameState, setGameState] = useState(null);

  useEffect(() => {
    Socket()
      .then(wrappedSocket => {
        socket = wrappedSocket;
        const userId = storageService.get('user.id');
        const userName = storageService.get('user.name');
        const socketId = socket.getSocketId();
        if (!userId) {
          storageService.set('user.id', socketId)
        }
        console.log(`App useEffect(), setting user.id: ${userId} user.name: ${userName}`);
        setUser({
          id: userId || socketId,
          name: userName
        });
        setLoading(false);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <div className="app" id="app">
      <UserProvider value={[user, setUser]}>
        <Nav />
        {
          loading ?
            <Loading message={"Connecting"} /> :
            null
        }
        {
          !loading && !gameStarted ?
            <Rooms
              activeRoomId={activeRoomId}
              handleGameStarting={handleGameStarting}
              joinRoom={joinRoom}
              leaveRoom={leaveRoom}
              setActiveRoomId={setActiveRoomId}
              socket={socket}
              startGame={startGame}
            /> :
            null
        }
        {
          !loading && gameStarted ?
            <Game
              activeRoomId={activeRoomId}
              leaveRoom={leaveRoom}
              socket={socket}
            /> :
            null
        }
      </UserProvider>
    </div>
  );
}

export default App;
