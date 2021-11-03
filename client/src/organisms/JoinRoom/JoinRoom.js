import React, { useState } from 'react';
import ReactModal from 'react-modal';

import './JoinRoom.css';
import Button from '../../atoms/Button/Button';
import modalStyles from '../../styles/modal';

ReactModal.setAppElement('#root');

const FORM_INITIAL_STATE = {
  playerName: ''
}

export default function JoinRoom ({ onCreate, show, toggleModal }) {

  const handleInputChanged = (event, field) => {
    const val = event.target.value;
    const newFormData = { ...formData, [field]: val };
    setFormData(newFormData);
    let valid = !!newFormData.ownerName;
    setSubmitDisabled(!valid);
  }

  const handleSubmit = () => {
    formData.roomName = formData.roomName || `${formData.ownerName}'s game`;
    onCreate(formData);
    setFormData({...FORM_INITIAL_STATE});
  }

  const [formData, setFormData] = useState({...FORM_INITIAL_STATE});
  const [submitDisabled, setSubmitDisabled] = useState(true);

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
            <Button
              disabled={submitDisabled}
              onClick={handleSubmit}
              text="Create"
            />
          </div>

        </form>
      </div>
    </ReactModal>
  );
}