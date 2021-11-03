import React, { useState, useEffect } from 'react';

import './App.css';
import Nav from './molecules/Nav/Nav';
import Messages from './organisms/Messages/Messages';
import Rooms from './organisms/Rooms/Rooms';
import Loading from './atoms/Loading/Loading';
// import Error from './atoms/Error/Error';

import { messageHistory, participants } from './api/mocks';
import Socket from './api/socket';

const socket = Socket();

function App() {

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [players, setPlayers] = useState({});
  const [room, setRoom] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMessages(messageHistory);
      setPlayers(participants);
      setLoading(false);
    }, 1000)
  }, []);


  return (
    <div className="app">
      <Nav />
      {
        loading ?
          <Loading /> :
          null
      }
      {
        !loading && !room ?
          <Rooms
            setRoom={setRoom}
            socket={socket}
          /> :
          null
      }
      {
        !loading && room ?
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
