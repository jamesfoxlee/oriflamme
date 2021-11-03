import React, { useState, useEffect } from 'react';

import './App.css';
import Nav from './molecules/Nav/Nav';
import Messages from './organisms/Messages/Messages';
import Rooms from './organisms/Rooms/Rooms';
import Loading from './atoms/Loading/Loading';
// import Error from './atoms/Error/Error';

import { messageHistory, participants } from './services/mocks.service';
import Socket from './services/socket.service';
import UserService from './services/user.service';

const userService = UserService();
let socket;

function App() {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(userService.get());
  const [messages, setMessages] = useState([]);
  const [players, setPlayers] = useState({});
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {
    Socket()
      .then(wrappedSocket => {
        socket = wrappedSocket;
        const socketId = socket.getSocketId();
        const userData = userService.get(socketId);
        setUser(userData);
        setLoading(false);
      })
      .catch(err => console.log(err))
  }, []);



  return (
    <div className="app" id="app">
      <Nav user={user} />
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
    </div>
  );
}

export default App;
