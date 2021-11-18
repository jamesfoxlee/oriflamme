import Status from './Status';
import { Card, Player, Players, Props } from './Props';
import '@testing-library/jest-dom';

import React from 'react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

const cardMock: Card = {
	id: 'conspiracy',
	name: 'Conspiracy',
	text:
		'Gain double the influence accumulated on Conspiracy when it is revealed. Discard Conspiracy.'
};
const cardMock2 = {
	id: 'assassination',
	name: 'Assassination',
	text: 'Elimate any card in the Queue. Discard Assassination.',
	revealed: false
};

const playerMock: Player = {
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

const propsMock: Props = {
	gameState: {
		abilityInterrupted: false,
		activePlayerId: playerMock.id,
		numPlayers: 1,
		phase: 'planning',
		planningPhasePlayed: 1,
		players: { n5EKpbcQWdoDvn8lAAAF: playerMock },
		queue: [
			[
				cardMock
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
	selectedPlayerCard: cardMock,
	user: {
		id: 'n5EKpbcQWdoDvn8lAAAF'
	}
};

let props = { ...propsMock };
let container: HTMLElement;
beforeEach(() => {
	// card = cardMock;
	// player = playerMock;
	// props = propsMock;
	// setup a DOM element as a render target
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	props = { ...propsMock };
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
});

test('displays status message', async () => {
  props.gameState.phase = 'planning';
  act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__phase')!.textContent).toBe(
		`Planning Phase `
	);

  props.gameState.phase = 'resolution';
  act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__phase')!.textContent).toBe(
		`Resolution Phase `
	);
});

test('displays status message', async () => {
	// PLANNING PHASE
  props.gameState.phase = 'planning';
	act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__message')!.textContent).toBe(
		`Play ${cardMock.name} to either end of the Queue, or select another card.`
	);

	props.selectedPlayerCard = undefined;
	act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__message')!.textContent).toBe(
		'Select a card to play to either end of the Queue.'
	);

	props.user.id = 'john';
	act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__message')!.textContent).toBe(
		`Waiting for ${playerMock.name} to play a card...`
	);

	// RESOLUTION PHASE

  // INACTIVE PLAYER
	props.gameState.phase = 'resolution';
  props.gameState.queue = [[cardMock2]];
	act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__message')!.textContent).toBe(
		`Waiting for ${playerMock.name} to choose whether to reveal the current card...`
	);

  props.gameState.queue[0][0].revealed = true;
  act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__message')!.textContent).toBe(
		`Waiting for ${playerMock.name} to resolve the effect of ${props.gameState.queue[0][0].name}...`
	);

  // ACTIVE PLAYER
  props.user.id = 'n5EKpbcQWdoDvn8lAAAF';
  act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__message')!.textContent).toBe(
		`Choose targets for ${props.gameState.queue[0][0].name}.`
	);

  props.gameState.queue[0][0].id = 'lord';
  act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__message')!.textContent).toBe(
		`${props.gameState.queue[0][0].name} may now gain additional influence. Click Confirm to continue.`
	);

  props.gameState.targetsNoneValid = true;
  act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__message')!.textContent).toBe(
		`No valid targets for ${props.gameState.queue[0][0].name}. Click Confirm to continue.`
	);

  props.gameState.resolvingCardToBeDiscarded = true;
  act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__message')!.textContent).toBe(
		`${props.gameState.queue[0][0].name} will now be discarded. Click Discard to continue.`
	);

  props.gameState.abilityInterrupted = true;
  act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__message')!.textContent).toBe(
		`Elimination interrupted by ${props.gameState.queue[0][0].name}. Click Confirm to continue.`
	);

  props.gameState.queue[0][0].revealed = false;
  act(() => {
		render(<Status {...props} />, container);
	});
	expect(container.querySelector('.status__message')!.textContent).toBe(
		`Reveal ${props.gameState.queue[0][0].name} to apply its effect, or place 1 influence on it.`
	);
});
