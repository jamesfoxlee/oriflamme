import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export default function Button (props) {

  const handleClick = () => {
    if (!props.disabled) {
      props.onClick();
    }
  }

  const buttonClass = `button button--${props.buttonStyle}`;

  return (
    <button
      autoComplete="off"
      className={buttonClass}
      disabled={props.disabled}
      onClick={handleClick}
      style={props.extraStyles}
      type="button"
    >
      {props.text || props.children}
    </button>
  );
}

//----------------------------------------------------------------
// PROPS
//----------------------------------------------------------------

const { bool, string, func, oneOf, object } = PropTypes;

Button.propTypes = {
  buttonStyle: oneOf(['positive', 'cancel', 'destructive']),
  disabled: bool,
  extraStyles: object,
  onClick: func.isRequired,
  text: string,
};

Button.defaultProps = {
  buttonStyle: 'positive',
  disabled: false,
  extraStyles: {}
};
