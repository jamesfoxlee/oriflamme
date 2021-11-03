import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

import Button from '../../atoms/Button/Button';

import './CreateRoom.css';

// TODO: pull into global modal styles file

const modalStyles = {
  overlay: {
    zIndex: 100,
    backgroundColor: 'hsla(0, 0%, 10%, 1)'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: 'none',
    backgroundColor: 'hsla(213, 62%, 15%, 1)'
  }
};

ReactModal.setAppElement('#root');

const FORM_INITIAL_STATE = {
  roomName: '',
  ownerName: ''
}

export default function CreateRoom ({ onCreate, show, toggleModal }) {

  const handleInputChanged = (event, field) => {
    const val = event.target.value;
    const newFormData = { ...formData, [field]: val };
    setFormData(newFormData);
  }

  const handleSubmit = () => {
    onCreate(formData);
    setFormData({...FORM_INITIAL_STATE});
  }

  const [formData, setFormData] = useState({...FORM_INITIAL_STATE});

  return (
    <ReactModal
      isOpen={show}
      onRequestClose={toggleModal}
      style={modalStyles}
      contentLabel="Example Modal"
    >
      <div className="create-room">
        <div className="create-room__title">Create a new room</div>
        <form className="create-room__form" id="create-room-form" >
          <div className="create-room__form-group">
            <label className="create-room__label" htmlFor="roomName">Room Name</label>
            <input
              id="roomName"
              className="create-room__input"
              placeholder="Enter room name (leave blank to generate randomly)"
              type="text"
              value={formData.roomName}
              onChange={(e) => handleInputChanged(e, 'roomName')}
            />
          </div>
          <div className="create-room__form-group">
            <label className="create-room__label" htmlFor="ownerName">Your Name</label>
            <input
              id="ownerName"
              className="create-room__input"
              placeholder="Enter your name for the game"
              type="text"
              value={formData.ownerName}
              onChange={(e) => handleInputChanged(e, 'ownerName')}
            />
          </div>
          <div className="create-room__form-group">
            <Button
              onClick={handleSubmit}
              text="Create"
            />
          </div>

        </form>
      </div>
    </ReactModal>
  );
}