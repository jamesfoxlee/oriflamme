import React, { useState, useEffect } from 'react';

import Loading from '../../atoms/Loading/Loading';

import './Rooms.css';

export default function Rooms ({ setRoom, socket }) {

  const handleRoomsChanged = (rooms) => {
    setRooms(rooms);
    setLoading(false);
  }

  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    socket.registerListener('rooms-changed', handleRoomsChanged);
    socket.getRooms(handleRoomsChanged);
    // TODO: change to cleanup useEffect to unregister listener
  }, [])

  return (
    <div className="rooms">
      {
        loading ?
          <Loading /> :
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
    </div>
  );
}

