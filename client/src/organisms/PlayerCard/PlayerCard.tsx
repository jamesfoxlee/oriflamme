import React, { useContext } from 'react';
import { Card } from '../../types/index';
import './PlayerCard.css';

import { CardsContext } from '../../context/cards.context';
import { getUrlCardFront } from '../../services/card-image.service';

export type Props = {
	canPlayCard: boolean;
	cardColor: string;
	cardId: string;
};

export default function PlayerCard ({ canPlayCard, cardColor, cardId }: Props) {
	// "METHODS"

	const handleCardClicked = (card: Card) => {
		if (canPlayCard) handlePlayerCardClicked(card);
	};

	// STATE, CONTEXT etc

	const { cards, handlePlayerCardClicked } = useContext(
		CardsContext
	);

	const card = cards[cardId];
	if (card === undefined) {
		throw new Error('Invalid card has been clicked.');
	}
	const cardImgUrl = getUrlCardFront(cardId, cardColor);

	return (
		<div className="player-card__wrapper">
			<img
				data-testid='player-card__card'
				className='player-card__card'
				src={`${process.env.PUBLIC_URL}/${cardImgUrl}`}
				onClick={() => handleCardClicked(card)}
			/>
		</div>
	);
}
