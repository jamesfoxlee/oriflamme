import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import './Card.css';

import useHover from '../../hooks/hover.hook';
import { CardsContext } from '../../context/cards.context';

// const HEIGHT_SCALE = 1.86666667;
const HEIGHT_SCALE = 1.5;

export default function Card(props) {

  const { canPlayCard, cardColor, cardId, scaleFactor, width } = props;
  const height = width * HEIGHT_SCALE;

  const noHoverStyles = {
    card: {
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: cardColor,
    }
  };

  const hoverStyles = {
    card: {
      marginBottom: `${width}px`,
      width: `${width * scaleFactor}px`,
      height: `${height * scaleFactor}px`,
      backgroundColor: cardColor,
    }
  };

  const [hoverRef, isHovered] = useHover();
  const [cards, onPlayerCardClicked] = useContext(CardsContext);
  const card = cards[cardId];
  const cardAbility = card.activate || card.reveal;

  return (
    <div className="card">
      <div
        className="card__element"
        onClick={() => onPlayerCardClicked(card)}
        ref={hoverRef}
        style={isHovered ? hoverStyles.card : noHoverStyles.card}
      >
        {
          isHovered ?
            <div className="card__text">{cardAbility.text}</div> :
            null
        }
        <div className="card__name">{card.name}</div>
      </div>
    </div>
  );
}

//----------------------------------------------------------------
// PROPS
//----------------------------------------------------------------

const { bool, number, string } = PropTypes;

Card.propTypes = {
  cardId: string.isRequired,
  revealed: bool,
  scaleFactor: number,
  width: number,
};

Card.defaultProps = {
  revealed: false,
  scaleFactor: 1.5,
  width: 120
};