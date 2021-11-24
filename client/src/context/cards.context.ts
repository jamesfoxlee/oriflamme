import { CARDS as cards, CardConstants } from '../config/cards.constants';
import { Card } from '../types/index';
import React from 'react';

type CardsProviderType = {
	cards: CardConstants,
	selectedPlayerCard: Card | null,
	handlePlayerCardClicked: (_: Card) => void
}

const def: CardsProviderType = {
	cards,
	selectedPlayerCard: cards.ambush,
	handlePlayerCardClicked: (_: Card) => {
		return;
	}
}

export const CardsContext: React.Context<CardsProviderType> = React.createContext(def);
export const CardsProvider = CardsContext.Provider;
