import React, { useState, useEffect, useContext } from 'react';

import './Rooms.css';
import CreateRoom from '../../organisms/CreateRoom/CreateRoom';
import RoomItem from '../../molecules/RoomItem/RoomItem';
import Loading from '../../atoms/Loading/Loading';
import Button from '../../atoms/Button/Button';

import SOCKET_CONSTANTS from '../../config/socket.constants';
import StorageService from '../../services/storage.service';
import { UserContext } from '../../context/user.context';

const { LOBBY } = SOCKET_CONSTANTS.EVENTS;

const storageService = StorageService();

export default function Rooms ({ joinRoom, leaveRoom, socket }) {

  const handleToggleModal = () => {
    setShowModal(!showModal);
  }

  const handleCreateRoom = (roomData) => {
    if (!user.name) {
      const newName = roomData.ownerName;
      storageService.set('user.name', newName);
      setUser({
        ...user,
        name: newName
      });
    }
    // listen for acknowledgement of room create so we can set it as active
    socket.registerOneShotListener(
      LOBBY.CREATE_ROOM_SUCCESS,
      (roomId) => joinRoom(roomId)
    );
    // create the room
    const owner = roomData.ownerName || user.name;
    socket.createRoom({
      ownerId: user.id,
      ownerName: user.name || roomData.ownerName,
      roomName: roomData.roomName || `${owner}'s game`,
    });
    handleToggleModal();
  }

  const handleRoomsChanged = (rooms) => {
    setRooms(rooms);
    if (loading) {
      setLoading(false);
    }
  }

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    socket.registerListener(LOBBY.ROOMS_CHANGED, handleRoomsChanged);
    socket.getRooms();
    // TODO: change to cleanup useEffect to unregister listener
  }, [])

  return (
    <div className="rooms">
      {
        loading ?
          <Loading message={"Loading rooms"} /> :
          null
      }
      {
        showModal ?
          <CreateRoom
            onSubmit={handleCreateRoom}
            show={showModal}
            toggleModal={handleToggleModal}
          /> :
          null
      }
      {
        !loading && !rooms.length ?
          <div>No rooms at the moment</div> :
          null
      }
      {
        !loading && rooms.length ?
          <div className="rooms__list">
            {
              rooms.map((room, idx) => {
                return (
                  <RoomItem
                    key={`room-item-${idx}`}
                    room={room}
                  />
                )
              })
            }
          </div> :
          null
      }
      <div className="rooms__buttons">
        <Button onClick={handleToggleModal} text="New Room"></Button>
      </div>
    </div>
  );
}
