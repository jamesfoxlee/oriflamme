import React from 'react';

import './Message.css';

export type Props = {
  from: string,
  message: {
    content: string,
  }
}

export default function Message (props: Props) {
  return (
    <div className="message">
        <span className="message__badge icon-message"></span>
        <span className="message__from">{props.from}:</span>
        <span className="message__content">{props.message.content}</span>
    </div>
  );
}