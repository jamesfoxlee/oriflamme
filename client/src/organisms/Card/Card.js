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

  // "METHODS"

  const handleCardClicked = () => {
    if (canPlayCard) {
      setSelected(!selected);
      const value = !selected ? card : null;
      onPlayerCardClicked(value);
    }
  }

  // DYNAMIC STYLES

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

  const selectedStyles = {
    card: {
      boxShadow: '0 0 1rem 1rem var(--color-white)',
    }
  };

  const [hoverRef, isHovered] = useHover();
  const [selected, setSelected] = useState(false);
  const [cards, onPlayerCardClicked] = useContext(CardsContext);
  const card = cards[cardId];
  const cardAbility = card.activate || card.reveal;
  const currentHoverStyle = isHovered ? hoverStyles.card : noHoverStyles.card;
  const currentSelectedStyle = selected ? selectedStyles.card : {};
  const combinedStyle = { ...currentHoverStyle, ...currentSelectedStyle };

  return (
    <div className="card">
      <div
        className="card__element"
        onClick={() => handleCardClicked(card)}
        ref={hoverRef}
        style={combinedStyle}
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