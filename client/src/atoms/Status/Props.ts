export type Card = {
	id: string;
	name: string;
  text: string;
	revealed?: boolean;
};

export type Player = {
	color: string;
	discardPile: Card[];
	hand: string[];
	id: string;
	imageUrl: string;
	influence: number;
	name: string;
	roomId: string;
};

export type Players = {
	[key: string]: Player;
};

export type Props = {
	gameState: {
		abilityInterrupted: boolean;
		activePlayerId: string;
		numPlayers: number;
		phase: string;
		planningPhasePlayed: number;
		players: Players;
		queue: Card[][];
		queueResolutionIndex: number;
		queueTargets?: [];
		resolvingCardToBeDiscarded?: boolean;
		roomId: null;
		round: number;
		targets?: [];
		targetsNoneValid: boolean;
		targetsNothing?: boolean;
		targetsSelf: boolean;
		targettedIndex: number | null;
		turnOrder: string[];
		turnOrderIndex: number;
	};
	selectedPlayerCard?: Card;
	user: {
		id: string;
	};
};
