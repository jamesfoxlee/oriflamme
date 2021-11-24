import React, { useState, useEffect, useContext } from 'react';
import './Rooms.css';
import PlayerNameForm from '../PlayerNameForm/PlayerNameForm';
import RoomItem from '../../molecules/RoomItem/RoomItem';
import Loading from '../../atoms/Loading/Loading';
import NoRooms from '../../atoms/NoRooms/NoRooms';
import Button from '../../atoms/Button/Button';
import StorageService from '../../services/storage.service';
import { SocketContext } from '../../context/socket.context';
import { UserContext } from '../../context/user.context';
import { SOCKET_EVENTS } from '../../config/socket.constants';
import { PlayerType } from '../../types';

const { LOBBY } = SOCKET_EVENTS;

const storageService = StorageService();

type Props={
  activeRoomId: string;
  joinRoom: (roomId:string,player:PlayerType)=>void;
  leaveRoom: (roomId:string,player:PlayerType)=>void;
  setActiveRoomId: (id:string)=>void
  startGame:(roomId:string)=>void
}
type WaitPlayer={
  id: string,
  name: string,
  socketId: string,
}
type Room={
    roomId: string,
    ownerId: string,
    players: WaitPlayer[]
    roomName: string,
    ownerName: string,
    started: boolean  
}


export default function Rooms({
  activeRoomId,
  joinRoom,
  leaveRoom,
  setActiveRoomId,
  startGame
}:Props) {

  useEffect(() => {
    socket.registerListener(LOBBY.ROOMS_CHANGED, handleRoomsChanged);
    socket.getRooms();    
    // TODO: change to cleanup useEffect to unregister listener
    return function teardownListeners() {
      socket.unregisterListeners(LOBBY.ROOMS_CHANGED);
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showPlayerNameForm, setShowPlayerNameForm] = useState(false);
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);

  const handleAddPlayerName = (playerName:string) => {
    storageService.set('user.name', playerName);
    setUser({
      ...user,
      name: playerName
    });
    togglePlayerNameForm();
  }

  const handleJoinRoom = (roomId:string) => {
    if (!user.name) {
      togglePlayerNameForm();
    } else {
      joinRoom(roomId, user);
    }
  }

  const handleLeaveRoom = (roomId:string) => {
    leaveRoom(roomId, user);
  }

  const handleNewRoom = () => {
    if (!user.name) {
      togglePlayerNameForm();
    }
    else {
      // listen for acknowledgement of room create so we can set it as active
      socket.registerOneShotListener(
        LOBBY.ROOM_CREATED,
        (roomId:string) => {
          joinRoom(roomId, user);
          setActiveRoomId(roomId);
        }
      );
      // create the room
      socket.createRoom({
        ownerId: user.id,
        ownerName: user.name,
        roomName: `${user.name}'s game`,
      });
    }
  }

  const handleRoomsChanged = (rooms:Room[]) => {
    setRooms(rooms);
    if (loading) {
      setLoading(false);
    }
  }

  const togglePlayerNameForm = () => {
    setShowPlayerNameForm(!showPlayerNameForm);
  }

  // TODO: New Room button stays disabled after server reconnect / reflash of rooms if
  // user had previously created one
  return (
    <div className="rooms">
      {
        showPlayerNameForm ?
          <PlayerNameForm
            onSubmit={handleAddPlayerName}
            show={showPlayerNameForm}
            toggleModal={togglePlayerNameForm}
          /> :
          null
      }
      {
        loading ?
          <Loading message={"Loading rooms"} /> :
          null
      }
      {
        !loading && !rooms.length ?
          <div className="rooms__list">
            <NoRooms />
          </div> :
          null
      }
      {
        !loading && rooms.length ?
          <div className="rooms__list">
            {
              rooms.map((room, idx) => {
                return (
                  <RoomItem
                    activeRoomId={activeRoomId}
                    joinRoom={handleJoinRoom}
                    leaveRoom={handleLeaveRoom}
                    playerIsOwner={room.ownerId === user.id}
                    key={`room-item-${idx}`}
                    room={room}
                    startGame={startGame}
                  />
                )
              })
            }
          </div> :
          null
      }
      {
        !loading ?
          <div className="rooms__buttons">
            <Button
              disabled={!!activeRoomId}
              onClick={handleNewRoom}
              text="New Room"
              />                   
          </div> :
          null
      }
    </div>
  );
}
