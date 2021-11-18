import Status from './Status';
import { Card, Player, Players, Props } from './Props';
import '@testing-library/jest-dom';

import React from 'react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container: HTMLElement;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
});

const card: Card = {
	id: 'conspiracy',
	name: 'Conspiracy',
	text:
		'Gain double the influence accumulated on Conspiracy when it is revealed. Discard Conspiracy.'
};

const player = {
	color: 'red',
	discardPile: [],
	hand: [
		'archer',
		'assassination',
		'conspiracy'
	],
	id: 'n5EKpbcQWdoDvn8lAAAF',
	imageUrl:
		'https://i.pinimg.com/originals/7a/ae/c8/7aaec855ca19276f3884f6b7655fdc33.jpg',
	influence: 1,
	name: 'JFK',
	roomId: '3b805350-4897-11ec-af1c-139452ba1c4c'
};

const props: Props = {
	gameState: {
		abilityInterrupted: false,
		activePlayerId: player.id,
		numPlayers: 1,
		phase: 'draw',
		planningPhasePlayed: 1,
		players: { n5EKpbcQWdoDvn8lAAAF: player },
		queue: [
			[
				card
			]
		],
		queueResolutionIndex: 0,
		roomId: null,
		round: 1,
		targetsNoneValid: false,
		targetsSelf: false,
		targettedIndex: null,
		turnOrder: [
			'n5EKpbcQWdoDvn8lAAAF'
		],
		turnOrderIndex: 1
	},
	selectedPlayerCard: card,
	user: {
		id: 'n5EKpbcQWdoDvn8lAAAF'
	}
};

test('displays round message', async () => {
	act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.round__text')!.textContent).toBe('Round 3');
});
