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

const { LOBBY } = SOCKET_EVENTS;

const storageService = StorageService();

export default function Rooms(props) {
  const {
    activeRoomId,
    joinRoom,
    leaveRoom,
    setActiveRoomId,
    startGame
  } = props;

  // "METHODS"

  const handleAddPlayerName = (playerName) => {
    storageService.set('user.name', playerName);
    setUser({
      ...user,
      name: playerName
    });
    togglePlayerNameForm();
  }

  const handleJoinRoom = (roomId) => {
    if (!user.name) {
      togglePlayerNameForm();
    } else {
      joinRoom(roomId, user);
    }
  }

  const handleLeaveRoom = (roomId) => {
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
        (roomId) => {
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

  const handleRoomsChanged = (rooms) => {
    setRooms(rooms);
    if (loading) {
      setLoading(false);
    }
  }

  const togglePlayerNameForm = () => {
    setShowPlayerNameForm(!showPlayerNameForm);
  }

  // STATE, CONTEXT etc

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [showPlayerNameForm, setShowPlayerNameForm] = useState(false);
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    socket.registerListener(LOBBY.ROOMS_CHANGED, handleRoomsChanged);
    socket.getRooms();    
    // TODO: change to cleanup useEffect to unregister listener
    return function teardownListeners() {
      socket.unregisterListeners(LOBBY.ROOMS_CHANGED);
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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
              text="New Room">
            </Button>
          </div> :
          null
      }
    </div>
  );
}
