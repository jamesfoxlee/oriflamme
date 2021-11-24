import React from 'react';
import './Message.css';

export type Props = {
  from: string,
  message: {
    content: string,
  }
}

export default function Message ({from,message}: Props) {
  return (
    <div className="message">
        <span className="message__badge icon-message"></span>
        <span className="message__from">{from}:</span>
        <span className="message__content">{message.content}</span>
    </div>
  );
}