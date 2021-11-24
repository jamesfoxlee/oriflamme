import React from "react";
import "./QCButtons.css";

export type Props = {
  text?: string;
  onYes?: () => void;
  onNo?: () => void;
};
export default function QCButtons({ text, onYes, onNo }: Props) {
  return (
    <div className="qc-buttons__prompt">
      {text}
      <div className="qc-buttons__buttons">
        {onYes ? (
          <button
            data-testid="onYes-button"
            className="qc-buttons__button"
            onClick={() => onYes()}
            type="button"
          >
            <span className="qc-buttons__button-icon icon-check" />
          </button>
        ) : null}
        {onNo ? (
          <button
            data-testid="onNo-button"
            className="qc-buttons__button"
            onClick={() => onNo()}
            type="button"
          >
            <span className="qc-buttons__button-icon icon-cross" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
