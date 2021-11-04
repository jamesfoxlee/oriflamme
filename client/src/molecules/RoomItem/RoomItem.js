import React, { useState, useEffect } from 'react';

import './RoomItem.css';
import Button from '../../atoms/Button/Button';

export default function RoomItem ({ onClick, room }) {

  const { id, ownerName, roomName, players } = room;

  return (
    <div className="room-item">
      <div className="room-item__info">
        <div className="room-item__name">{roomName}</div>
        <div className="room-item__name">{id}</div>
        <div className="room-item__player-count">{players.length} players</div>
        <div className="room-item__name">Created by {ownerName}</div>
      </div>
      <div className="room-item__buttons">
        <Button
          onClick={ () => onClick(room) }
          text="Join"
        />
      </div>
    </div>
  );
}