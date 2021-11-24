import { GameState } from '../types/index';

type GameStateMocks = {
	[key: string]: GameState
}

export const gameStateMocks: GameStateMocks = {
	placeholder: {
		abilityInterrupted: false,
		activePlayerId: 'placeholder',
		numPlayers: 0,
		phase: 'planning',
		planningPhasePlayed: 0,
		players: {
			placeholder: {
				color: '',
				discardPile: [],
				hand: [
					'assassination',
					'conspiracy',
				],
				id: '',
				imageUrl:
					'',
				influence: 0,
				name: 'placeholder',
				roomId: ''
			}
		},
		queue: [],
		queueResolutionIndex: 0,
		roomId: null,
		round: 0,
		targetsNoneValid: false,
		targetsSelf: false,
		targettedIndex: null,
		turnOrder: [''],
		turnOrderIndex: 0
	}
};
