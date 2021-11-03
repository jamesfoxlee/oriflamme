import React, { useState, useEffect } from 'react';

import CreateRoom from '../../organisms/CreateRoom/CreateRoom';
import Loading from '../../atoms/Loading/Loading';
import Button from '../../atoms/Button/Button';

import './Rooms.css';

export default function Rooms ({ setActiveRoom, socket }) {

  const handleToggleModal = () => {
    setShowModal(!showModal);
  }

  const handleCreateRoom = (roomData) => {
    console.log(roomData);
    socket.createRoom(roomData);
    handleToggleModal();
  }

  const handleRoomsChanged = (rooms) => {
    setRooms(rooms);
    setLoading(false);
  }

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    socket.registerListener('rooms-changed', handleRoomsChanged);
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
            onCreate={handleCreateRoom}
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
                  <div
                    className="room__item"
                    key={`room-item-${idx}`}
                  >
                    {room.id}
                  </div>
                )
              })
            }
          </div> :
          null
      }
      <Button onClick={handleToggleModal} text="New Room"></Button>
    </div>
  );
}

