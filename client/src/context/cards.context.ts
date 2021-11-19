import { CARDS as cards } from '../config/cards.constants';
import React from 'react';

export const CardsContext = React.createContext([
	cards,
	null,
	() => {
		return;
	}
]);
export const CardsProvider = CardsContext.Provider;
