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
      contentLabel="Join Room"
    >
      <div className="join-room">
        <div className="join-room__title">Create a new room</div>
        <form className="join-room__form" id="join-room-form" >
          <div className="join-room__form-group">
            <label className="join-room__label" htmlFor="ownerName">Your Name</label>
            <input
              id="ownerName"
              className="join-room__input"
              placeholder="Enter your name for the game"
              type="text"
              value={formData.ownerName}
              onChange={(e) => handleInputChanged(e, 'ownerName')}
            />
          </div>
          <div className="join-room__form-group">
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