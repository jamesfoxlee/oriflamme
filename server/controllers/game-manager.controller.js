const { v1: uuidv1 } = require('uuid');

const { Room } = require('../models/room.model');
const CardHelper = require('../helpers/card.helper');

const {
  INITIAL_GAMESTATE,
  INITIAL_PLAYERSTATE,
  STARTING_HAND_SIMPLE,
  PHASES,
  PLAYER_IMAGES,
  PLAYER_COLORS
} = require('../config/game.constants');

const cardHelper = CardHelper();

function GameManager () {

  let _gameState = null;
  const _history = [];

  // PRIVATE

  const _getTopCardInStack = (queue, qri) => {
    const stack = queue[qri];
    return stack[stack.length - 1];
  };

  const _checkForResolutionPhase = (prevState) => {
    console.log('GameManager._checkForResolutionPhase()');
    if (prevState.planningPhasePlayed === prevState.numPlayers) {
      // advance to resolution phase
      const firstQueueCard = _getTopCardInStack(prevState.queue, 0);
      return {
        ...prevState,
        activePlayerId: firstQueueCard.ownerId,
        phase: PHASES.RESOLUTION,
      };
    }
    // otherwise it's the next player
    return {
      ...prevState,
      activePlayerId: prevState.turnOrder[prevState.turnOrderIndex + 1],
      turnOrderIndex: prevState.turnOrderIndex + 1,
    }
  }

  const _checkForNextRound = (prevState) => {
    console.log('GameManager._checkForNextRound()');
    if (prevState.queueResolutionIndex < prevState.queue.length) {
      // there are cards left to resolve
      const nextCard = _getTopCardInStack(prevState.queue, prevState.queueResolutionIndex);
      return {
        ...prevState,
        activePlayerId: nextCard.ownerId,
      };
    }
    // advance the round
    const updatedTurnOrder = prevState.turnOrder.slice(1).concat(prevState.turnOrder.slice(0, 1));
    return {
      ...prevState,
      activePlayerId: updatedTurnOrder[0],
      phase: PHASES.PLANNING,
      planningPhasePlayed: 0,
      queueResolutionIndex: 0,
      round: prevState.round + 1,
      turnOrder: updatedTurnOrder,
      turnOrderIndex: 0
    };
  }

  // PUBLIC

  const initialise = (room) => {

    // TODO: card randomisation
    // TODO: extract into helper
    // TODO: FY shuffle helper

    console.log('GameManager.initialise()');
    const { players, roomId } = room;
    const numPlayers = players.length;
    const colors = [...PLAYER_COLORS];
    const images = [...PLAYER_IMAGES];
    // create a turn order
    // TODO: first player randomisation of turn order
    // convert array of players into an object ref'd by playerId
    const turnOrder = [];
    const playersObj = {};
    players.forEach((player, idx) => {
      turnOrder.push(player.id);
      playersObj[player.id] = {
        ...INITIAL_PLAYERSTATE,
        id: player.id,
        color: colors[idx],
        hand: [...STARTING_HAND_SIMPLE],
        imageUrl: images[idx],
        influence: 1,
        name: player.name,
        roomId: roomId,
      }
    });

    _gameState = {
      ...INITIAL_GAMESTATE,
      activePlayerId: turnOrder[0],
      numPlayers: numPlayers,
      players: playersObj,
      queue: [],
      turnOrder: turnOrder
    }
  };

  const getGameState = () => _gameState;

  const playCard = (cardPlayed, position) => {
    console.log('GameManager.playCard()');
    // update hand of player that played card
    let nextState = {..._gameState};
    const playerId = cardPlayed.ownerId;
    const player = nextState.players[playerId];
    const updatedHand = player.hand.filter(handCardId => handCardId !== cardPlayed.id);
    player.hand = updatedHand;
    // NB must add card to queue inside an array - queue is nested arrays!
    // TODO: implement adding to stack here
    nextState.queue.splice(position, 0, [cardPlayed]);
    nextState.planningPhasePlayed += 1;
    // TODO: save old gameState in history / DB
    _gameState = _checkForResolutionPhase(nextState);
  };

  const queueNoReveal = (qri) => {
    console.log('GameManager.queueNoReveal() at queue index: ', qri);
    let nextState = {..._gameState};
    const updatedCard = _getTopCardInStack(nextState.queue, qri);
    updatedCard.influence += 1;
    // next player / advance round
    nextState.queueResolutionIndex += 1;
    // TODO: save old gameState in history / DB
    _gameState = _checkForNextRound(nextState);
  }

  const queueReveal = (qri) => {
    console.log('GameManager.queueReveal() at queue index: ', qri);
    const nextState = {..._gameState};
    const { queue } = nextState;
    const card = _getTopCardInStack(queue, qri);
    const { ownerId } = card;
    const owner = nextState.players[ownerId];
    console.log('card: ', card.name);
    card.revealed = true;
    // TODO: send message saying 'PLAYER revealed CARD.'
    const influenceGain = cardHelper.getInfluenceGain(card);
    owner.influence += influenceGain;
    // TODO: send message saying 'PLAYER gained INFLUENCE influence accumulated on CARD.'
    nextState.queueTargets = cardHelper.getTargetsForAbility(card, queue);
    // TODO: send message saying 'PLAYER is resolving CARD ability.'
    // TODO: save old gameState in history / DB
    _gameState = nextState;
  }


  const queueAfterAbility = () => {
    // discard? etc (see Power Point)

    // next player / advance round
    nextState.queueResolutionIndex += 1;
    // TODO: save old gameState in history / DB
    _gameState = _checkForNextRound(nextState);
  };

  // const INITIAL_GAMESTATE = {
  //   activePlayerId: null,
  //   numPlayers: 0,
  //   phase: 'planning',
  //   planningPhasePlayed: 0,
  //   players: {},
  //   queue: [],
  //   queueResolutionIndex: 0,
  //   queueTargets: [],
  //   roomId,
  //   round: 1,
  //   turnOrder: [],
  //   turnOrderIndex: 0
  // }

  return {
    getGameState,
    initialise,
    playCard,
    queueNoReveal,
    queueReveal,
    // queueBeforeAbility,
    // queueOnAbility,
    // queueAfterAbility,
  }
}

module.exports = GameManager;