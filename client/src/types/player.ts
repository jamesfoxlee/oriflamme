import { Card } from './index';

export type PlayerType = {
	color: string;
	discardPile: string[];
	hand: string[];
	id: string;
	imageUrl: string;
	influence: number;
	name: string;
	roomId: string;
};