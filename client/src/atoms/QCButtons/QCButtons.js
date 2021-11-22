import React from "react";
import "./QCButtons.css";

export default function QCButtons(props) {
  return (
    <div className="qc-buttons__prompt">
      {props.text}
      <div className="qc-buttons__buttons">
        {props.onYes ? (
          <button
            data-testid="onYes-button"
            autoComplete="off"
            className="qc-buttons__button"
            onClick={() => props.onYes()}
            type="button"
          >
            <span className="qc-buttons__button-icon icon-check" />
          </button>
        ) : null}
        {props.onNo ? (
          <button
            data-testid="onNo-button"
            autoComplete="off"
            className="qc-buttons__button"
            onClick={() => props.onNo()}
            type="button"
          >
            <span className="qc-buttons__button-icon icon-cross" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
