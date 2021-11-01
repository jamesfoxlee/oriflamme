import React, { useState, useEffect } from 'react';

import './App.css';
import Nav from './molecules/Nav/Nav';
import Messages from './organisms/Messages/Messages';
import Loading from './atoms/Loading/Loading';
// import Error from './atoms/Error/Error';

import { messageHistory, participants } from './api/mocks';
import Socket from './api/socket';

const socketClient = Socket();  

function App() {

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [players, setPlayers] = useState({});
  const [client, setClient] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setMessages(messageHistory);
      setPlayers(participants);
      setClient(socketClient)
      setLoading(false);
    }, 1000)
  }, []);

  const onSendMessage = (event) => {
    console.log('onSendMessage');
  }

  return (
    <div className="app">
    <Nav />
    {
      loading ?
        <Loading /> :
        null
    }
    {/* {
      error && !loading ?
        <Error error={error} /> :
        null
    } */}
    {
      !loading ?
        <div className="main">
          <Messages
            messages={messages}
            players={players}
            onSendMessage={onSendMessage}
          />
        </div> :
        null
    }
    </div>
  );
}

export default App;
