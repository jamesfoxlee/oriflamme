import Status from "./Status";
import { playerMocks } from "../../mocks/players.mocks";
import { cardMocks } from "../../mocks/cards.mocks";
import { qCardMocks } from "../../mocks/qcards.mocks";
import { Props } from "./Status";
import "@testing-library/jest-dom";

import React from "react";
import { act } from "react-dom/test-utils";
import { render, unmountComponentAtNode } from "react-dom";

const { simple, hidden } = qCardMocks;

const playerMock = playerMocks.simple;

const propsMock: Props = {
  gameState: {
    abilityInterrupted: false,
    activePlayerId: playerMock.id,
    numPlayers: 1,
    phase: "planning",
    planningPhasePlayed: 1,
    players: { n5EKpbcQWdoDvn8lAAAF: playerMock },
    queue: [[simple]],
    queueResolutionIndex: 0,
    roomId: null,
    round: 1,
    targetsNoneValid: false,
    targetsSelf: false,
    targettedIndex: null,
    turnOrder: ["n5EKpbcQWdoDvn8lAAAF"],
    turnOrderIndex: 1,
  },
  selectedPlayerCard: simple,
  user: {
    id: "n5EKpbcQWdoDvn8lAAAF",
  },
};

let props = { ...propsMock };
let container: HTMLElement;
beforeEach(() => {
  // card = simple;
  // player = playerMock;
  // props = propsMock;
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  props = { ...propsMock };
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
});

test("displays status message", async () => {
  props.gameState.phase = "planning";
  act(() => {
    render(<Status {...props} />, container);
  });
  expect(container.querySelector(".status__phase")!.textContent).toBe(
    `Planning Phase `
  );

  props.gameState.phase = "resolution";
  act(() => {
    render(<Status {...props} />, container);
  });
  expect(container.querySelector(".status__phase")!.textContent).toBe(
    `Resolution Phase `
  );
});

test("displays status message", async () => {
  // PLANNING PHASE
  props.gameState.phase = "planning";
  act(() => {
    render(<Status {...props} />, container);
  });
  expect(container.querySelector(".status__message")!.textContent).toBe(
    `Play ${simple.name} to either end of the Queue, or select another card.`
  );

  act(() => {
    render(
      <Status {...{ ...props, selectedPlayerCard: undefined }} />,
      container
    );
  });
  expect(container.querySelector(".status__message")!.textContent).toBe(
    "Select a card to play to either end of the Queue."
  );

  props.user.id = "john";
  act(() => {
    render(<Status {...props} />, container);
  });
  expect(container.querySelector(".status__message")!.textContent).toBe(
    `Waiting for ${playerMock.name} to play a card...`
  );

  // RESOLUTION PHASE

  // INACTIVE PLAYER
  props.gameState.phase = "resolution";
  props.gameState.queue = [[hidden]];
  act(() => {
    render(<Status {...props} />, container);
  });
  expect(container.querySelector(".status__message")!.textContent).toBe(
    `Waiting for ${playerMock.name} to choose whether to reveal the current card...`
  );

  props.gameState.queue[0][0].revealed = true;
  act(() => {
    render(<Status {...props} />, container);
  });
  expect(container.querySelector(".status__message")!.textContent).toBe(
    `Waiting for ${playerMock.name} to resolve the effect of ${props.gameState.queue[0][0].name}...`
  );

  // ACTIVE PLAYER
  props.user.id = "n5EKpbcQWdoDvn8lAAAF";
  act(() => {
    render(<Status {...props} />, container);
  });
  expect(container.querySelector(".status__message")!.textContent).toBe(
    `Choose targets for ${props.gameState.queue[0][0].name}.`
  );

  props.gameState.queue[0][0].id = "lord";
  act(() => {
    render(<Status {...props} />, container);
  });
  expect(container.querySelector(".status__message")!.textContent).toBe(
    `${props.gameState.queue[0][0].name} may now gain additional influence. Click Confirm to continue.`
  );

  props.gameState.targetsNoneValid = true;
  act(() => {
    render(<Status {...props} />, container);
  });
  expect(container.querySelector(".status__message")!.textContent).toBe(
    `No valid targets for ${props.gameState.queue[0][0].name}. Click Confirm to continue.`
  );

  const gameState = { ...props.gameState };
  gameState.resolvingCardToBeDiscarded = true;
  act(() => {
    render(<Status {...{ ...props, gameState }} />, container);
  });
  expect(container.querySelector(".status__message")!.textContent).toBe(
    `${props.gameState.queue[0][0].name} will now be discarded. Click Discard to continue.`
  );

  props.gameState.abilityInterrupted = true;
  act(() => {
    render(<Status {...props} />, container);
  });
  expect(container.querySelector(".status__message")!.textContent).toBe(
    `Elimination interrupted by ${props.gameState.queue[0][0].name}. Click Confirm to continue.`
  );

  props.gameState.queue[0][0].revealed = false;
  act(() => {
    render(<Status {...props} />, container);
  });
  expect(container.querySelector(".status__message")!.textContent).toBe(
    `Reveal ${props.gameState.queue[0][0].name} to apply its effect, or place 1 influence on it.`
  );
});
