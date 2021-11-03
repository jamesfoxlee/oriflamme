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

const socket = Socket();
const userService = UserService();
const user = userService.get(socket.getSocketId());

function App() {

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [players, setPlayers] = useState({});
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMessages(messageHistory);
      setPlayers(participants);
      setLoading(false);
    }, 1000)
  }, []);


  return (
    <div className="app" id="app">
      <Nav />
      {
        loading ?
          <Loading /> :
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
