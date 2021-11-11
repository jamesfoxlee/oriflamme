import React, { useState } from 'react';

import './RoomItem.css';
import PlayerNameForm from '../../organisms/PlayerNameForm/PlayerNameForm';
import Button from '../../atoms/Button/Button';

export default function RoomItem (props) {

  const { isActiveRoom, joinRoom, leaveRoom, room } = props;

  const handleJoinRoom = (roomId) => {
    console.log(`handleJoinRoom: roomId: ${roomId}`);
    joinRoom(roomId);
  }
  const handleLeaveRoom = (roomId) => {
    console.log(`handleLeaveRoom: roomId: ${roomId}`);
    leaveRoom(roomId);
  }

  const { roomId, ownerName, roomName, players } = room;
  const numPlayers = players.length;
  const playersText = ` player${numPlayers > 1 ? 's' : ''}`;
  const playersList = players.map(player => player.name).join(', ');
  const playersString = `${numPlayers} ${playersText} (${playersList})`;

  return (
    <div className="room-item">
      <div className="room-item__info">
        <div className="room-item__">
          {roomName} <span className="room-item__smallprint">{roomId}</span>
        </div>
        <div className="room-item__player-count">{playersString}</div>
        <div className="room-item__smallprint">Created by {ownerName}</div>
      </div>
      <div className="room-item__buttons">
        {
          !isActiveRoom ?
            <Button
              buttonStyle="positive"
              onClick={ () => joinRoom(roomId) }
              extraStyles={{ maxWidth: '10rem' }}
              text="Join"
            /> :
            null
        }
        <Button
          buttonStyle="destructive"
          extraStyles={{ maxWidth: '10rem' }}
          onClick={ () => leaveRoom(roomId) }
          text="Leave"
        />
      </div>
    </div>
  );
}