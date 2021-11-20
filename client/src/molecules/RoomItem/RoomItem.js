import React from 'react';

import './RoomItem.css';
import Button from '../../atoms/Button/Button';

export default function RoomItem (props) {
  console.log(props);
  const { activeRoomId, joinRoom, leaveRoom, playerIsOwner, room, startGame } = props;

  const { roomId, ownerName, roomName, players, started } = room;
  const numPlayers = Object.keys(players).length;
  const playersText = ` player${numPlayers > 1 ? 's' : ''}`;
  const playersList = Object.values(players).map(player => player.name).join(', ');
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
          activeRoomId === roomId ?
          <Button
            buttonStyle="destructive"
            extraStyles={{ maxWidth: '10rem' }}
            onClick={ () => leaveRoom(roomId) }
            text="Leave"
          /> :
          null
        }
        {
          // isActiveRoom && playerIsOwner && players.length > 1 ?
          activeRoomId === roomId && playerIsOwner ?
            <Button
              buttonStyle="positive"
              extraStyles={{ maxWidth: '12rem' }}
              onClick={ () => startGame(roomId) }
              text="Start"
            /> :
            null
        }
        {
          !activeRoomId && !started ?
            <Button
              buttonStyle="positive"
              extraStyles={{ maxWidth: '12rem' }}
              onClick={ () => joinRoom(roomId) }
              text="Join"
            /> :
            null
        }
      </div>
    </div>
  );
}