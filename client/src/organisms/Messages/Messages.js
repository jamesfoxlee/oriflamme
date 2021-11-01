import React, { useState, useEffect } from 'react';

import './Messages.css';
import Message from '../../atoms/Message/Message';

export default function Messages(props) {

  const handleSend = (event) => {
    event.preventDefault();
    props.onSendMessage();

  }

  const { messages, players } = props;
  console.log(players)
  const sortedMessages = [...messages].sort((a, b) => {
    const aDate = new Date(a.timestamp).getTime();
    const bDate = new Date(b.timestamp).getTime();
    return aDate - bDate;
  })

  return (
    <div className="messages">
      <div className="messages__header"></div>
      <div className="messages__list">
        {
          sortedMessages.map((message, idx) => {
            const messageFrom = players[message.from].handle;
            return (
              <Message
                message={message}
                from={messageFrom}
                key={`message-${idx}`}
              />
            )
          })
        }
        <form className="messages__compose" id="message-form" action="">
          <input className="messages__input" name="" />
          <button
            className="messages__send"
            onClick={handleSend}
            type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}