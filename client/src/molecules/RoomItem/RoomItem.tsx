import React from 'react';
import './RoomItem.css';
import Button from '../../atoms/Button/Button';

type WaitPlayer={
  id: string,
  name: string,
  socketId: string,
}

type Props={
  activeRoomId: string,
  joinRoom:(id: string)=> void,
  playerIsOwner: boolean,
  room:{
    roomId: string,
    ownerId: string,
    players: WaitPlayer[]
    roomName: string,
    ownerName: string,
    started: boolean 
  },
  leaveRoom: (id:string)=>void,
  startGame: (id:string)=>void

}

export default function RoomItem ({ activeRoomId, joinRoom, leaveRoom, playerIsOwner, room, startGame }:Props) {
 

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