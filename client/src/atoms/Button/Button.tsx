import React from "react";
import "./Button.css";

type Props = {
  buttonStyle?: string;
  disabled?: boolean;
  extraStyles?: {};
  text: string;
  children?: string;
  onClick: () => void;
};
export default function Button({
  buttonStyle,
  disabled,
  extraStyles,
  text,
  children,
  onClick,
}: Props) {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  const buttonClass = `button button--${buttonStyle}`;

  return (
    <button
      aria-label={text}
      className={buttonClass}
      disabled={disabled}
      onClick={handleClick}
      style={extraStyles}
      type="button"
    >
      {text || children}
    </button>
  );
}
