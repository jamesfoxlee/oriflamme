import React from 'react';

import './PlayerHand.css';
import PlayerCard from '../PlayerCard/PlayerCard';

export type Props = { 
	cardColor: string;
	hand: string[];
	isActive: boolean;
};

export default function PlayerHand (props: Props) {
	const { cardColor, hand, isActive } = props;

	return (
		<div data-testid='player-hand' className='player-hand'>
			{hand.map((cardId, idx) => {
				return (
					<PlayerCard
						canPlayCard={isActive}
						cardColor={cardColor}
						cardId={cardId}
						key={`player-hand-card-${idx}`}
					/>
				);
			})}
		</div>
	);
}
