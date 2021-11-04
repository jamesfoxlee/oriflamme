import React, { useState, useEffect } from 'react';

import './RoomItem.css';
import Button from '../../atoms/Button/Button';

export default function RoomItem ({ joinRoom, room }) {

  const { id, ownerName, roomName, players } = room;
  const numPlayers = players.length;
  const playersText = ` player${numPlayers > 1 ? 's' : ''}`

  return (
    <div className="room-item">
      <div className="room-item__info">
        <div className="room-item__">
          {roomName} <span className="room-item__smallprint">{id}</span>
        </div>
        <div className="room-item__player-count">{numPlayers}{playersText}</div>
        <div className="room-item__smallprint">Created by {ownerName}</div>
      </div>
      <div className="room-item__buttons">
        <Button
          onClick={ () => joinRoom(room.id) }
          text="Join"
        />
      </div>
    </div>
  );
}