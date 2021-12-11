import React, { useContext } from "react";
import { Card } from "../../types/index";
import "./PlayerCard.css";
import { CardsContext } from "../../context/cards.context";
import { getUrlCardFront } from "../../services/card-image.service";

export type Props = {
  canPlayCard: boolean;
  cardColor: string;
  cardId: string;
};

export default function PlayerCard({ canPlayCard, cardColor, cardId }: Props) {
  const handleCardClicked = (card: Card) => {
    if (canPlayCard) handlePlayerCardClicked(card);
  };

  const { cards, selectedPlayerCard, handlePlayerCardClicked } =
    useContext(CardsContext);

  const card = cards[cardId];
  if (card === undefined) {
    throw new Error("Invalid card has been clicked.");
  }
  const cardImgUrl = getUrlCardFront(cardId, cardColor);

  const selectedCardStyle = {
    height: "150%",
    zIndex: "var(--layer-4)",
    boxShadow: "0 0 1rem 1rem white",
  };

  const selectedWrapperStyle = {
    overflow: "visible",
  };

  if (selectedPlayerCard && selectedPlayerCard.id === cardId) {
    return (
      <div className="player-card__wrapper" style={selectedWrapperStyle}>
        <img
          alt="player-card"
          data-testid="player-card__card"
          className="player-card__card"
          src={`${process.env.PUBLIC_URL}/${cardImgUrl}`}
          onClick={() => handleCardClicked(card)}
          style={selectedCardStyle}
        />
      </div>
    );
  }
  return (
    <div className="player-card__wrapper">
      <img
        alt="player-card"
        data-testid="player-card__card"
        className="player-card__card"
        src={`${process.env.PUBLIC_URL}/${cardImgUrl}`}
        onClick={() => handleCardClicked(card)}
      />
    </div>
  );
}
