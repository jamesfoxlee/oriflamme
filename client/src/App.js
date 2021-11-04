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

  const joinRoom = (roomId) => {
    socket.joinRoom(roomId, user);
    setActiveRoom(roomId);
  }

  const leaveRoom = () => {
    setActiveRoom(null);
  }

  const [activeRoom, setActiveRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ id: null, name: null});

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
          !loading && !activeRoom ?
            <Rooms
              joinRoom={joinRoom}
              leaveRoom={leaveRoom}
              socket={socket}
            /> :
            null
        }
        {
          !loading && activeRoom ?
              <Game
                activeRoom={activeRoom}
                socket={socket}
              /> :
            null
        }
      </UserProvider>
    </div>
  );
}

export default App;
