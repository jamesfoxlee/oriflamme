import React, { useState, useEffect } from 'react';

import './App.css';
import Game from './views/Game/Game';
import Rooms from './organisms/Rooms/Rooms';
import Nav from './molecules/Nav/Nav';
import Loading from './atoms/Loading/Loading';
// import Error from './atoms/Error/Error';

import Socket from './services/socket.service';
import StorageService from './services/storage.service';
import { UserProvider } from './context/user.context';


const storageService = StorageService();
let socket;

function App() {

  const joinRoom = (roomId, player) => {
    socket.joinRoom(roomId, player);
    setActiveRoomId(roomId);
  }

  const leaveRoom = () => {
    setActiveRoomId(null);
  }

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ id: null, name: null});
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [gameState, setGameState] = useState(null);

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

  const gameStarted = activeRoomId && gameState && gameState.started;

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
              joinRoom={joinRoom}
              leaveRoom={leaveRoom}
              socket={socket}
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
