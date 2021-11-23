import { MessageType, Players } from '../../types/index'
import React, { useState } from 'react';

import './Messages.css';
import Message from '../../atoms/Message/Message';

type Props = {
  messages: MessageType[];
  players: Players;
}

export default function Messages({ messages, players }: Props) {

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }

  const handleMessageSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (message.length) {
      // socket.postMessage(message);
      setMessage('');
    }
  }

  const [message, setMessage] = useState('');

  const sortedMessages = [...messages].sort((a, b) => {
    const aDate = new Date(a.timestamp).getTime();
    const bDate = new Date(b.timestamp).getTime();
    return aDate - bDate;
  });

  return (
    <div className="messages">
      <div className="messages__header">Messages</div>
      <div className="messages__list">
        {
          sortedMessages.length ?
            sortedMessages.map((message, idx) => {
              const messageFrom = players[message.from].name;
              return (
                <Message
                  message={message}
                  from={messageFrom}
                  key={`message-${idx}`}
                />
              )
            }) :
            null
        }
        <form className="messages__compose" id="message-form" action="">
          <input
            className="messages__input"
            name="message-input"
            onChange={handleMessageChange}
            value={message}
          />
          <button
            className="messages__send"
            onClick={handleMessageSend}
            type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}