import React, { useState } from "react";
import ReactModal from "react-modal";

import "./PlayerNameForm.css";
import Button from "../../atoms/Button/Button";
import modalStyles from "../../styles/modal";

// import { UserContext } from '../../context/user.context';
if (process.env.NODE_ENV !== "test") ReactModal.setAppElement("#app");

ReactModal.setAppElement("#root");

const FORM_INITIAL_STATE = {
  roomName: "",
  playerName: "",
};

export default function PlayerNameForm({ onSubmit, show, toggleModal }) {
  const handleInputChanged = (event, field) => {
    const val = event.target.value;
    const newFormData = { ...formData, [field]: val };
    setFormData(newFormData);
    setSubmitEnabled(formIsValid());
  };

  const formIsValid = () => !!formData.playerName;

  const handleSubmit = () => {
    onSubmit(formData.playerName);
    setFormData({ ...FORM_INITIAL_STATE });
  };

  // const [user] = useContext(UserContext);

  const [formData, setFormData] = useState({ ...FORM_INITIAL_STATE });
  const [submitEnabled, setSubmitEnabled] = useState(formIsValid());

  return (
    <ReactModal
      isOpen={show}
      onRequestClose={toggleModal}
      style={modalStyles}
      contentLabel="Example Modal"
    >
      <div className="player-name-form">
        <div className="player-name-form__title">What should we call you?</div>
        <form className="player-name-form__form" id="player-name-form-form">
          <div className="player-name-form__form-group">
            <label className="player-name-form__label" htmlFor="playerName">
              Name / handle
            </label>
            <input
              id="playerName"
              className="player-name-form__input"
              placeholder="Enter anything you like..."
              type="text"
              value={formData.playerName}
              onChange={(e) => handleInputChanged(e, "playerName")}
            />
          </div>
          <div className="player-name-form__form-group">
            <Button
              disabled={!submitEnabled}
              onClick={handleSubmit}
              text="Submit"
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
