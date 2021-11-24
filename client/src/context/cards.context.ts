import { CARDS as cards } from '../config/cards.constants';
import { Card } from '../types/index';
import React from 'react';

export const CardsContext = React.createContext({
	cards,
	selectedPlayerCard: cards.ambush,
	handlePlayerCardClicked: (_: Card) => {
		return;
	}
});
export const CardsProvider = CardsContext.Provider;
