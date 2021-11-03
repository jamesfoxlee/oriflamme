import React, { useState, useEffect } from 'react';

import './App.css';
import Nav from './molecules/Nav/Nav';
import Messages from './organisms/Messages/Messages';
import Rooms from './organisms/Rooms/Rooms';
import Loading from './atoms/Loading/Loading';
// import Error from './atoms/Error/Error';

import Socket from './services/socket.service';
import StorageService from './services/storage.service';
import { UserProvider } from './context/user.context';


const storageService = StorageService();
let socket;

function App() {

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [players, setPlayers] = useState({});
  const [user, setUser] = useState({ id: null, name: null});
  const [activeRoom, setActiveRoom] = useState(null);

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
              setActiveRoom={setActiveRoom}
              socket={socket}
            /> :
            null
        }
        {
          !loading && activeRoom ?
              <Messages
                messages={messages}
                players={players}
                socket={socket}
              /> :
            null
        }
      </UserProvider>
    </div>
  );
}

export default App;
