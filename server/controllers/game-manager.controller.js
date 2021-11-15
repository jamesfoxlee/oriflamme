const { v1: uuidv1 } = require('uuid');

const { Room } = require('../models/room.model');
const CardHelper = require('../helpers/card.helper');
const { CARD_EFFECTS } = require('../config/game.constants');

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
    return stack && stack[stack.length - 1];
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
    // TODO: send a message that "New round started. PLAYER is now the first player."
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

  const _discardCardAfterAbility = (prevState) => {
    console.log('GameManager._discardCardAfterAbility()');
    const nextState = {...prevState};
    const { players, queue, queueResolutionIndex:qri } = nextState;
    const discardStack = queue[qri];
    const discardedCard = discardStack.pop();
    if (_getTopCardInStack(queue, qri) === undefined) {
      queue.splice(qri, 1);
      // need to compensate or next card would not get to resolve
      nextState.queueResolutionIndex -= 1;
    }
    const discardedCardOwner = players[discardedCard.ownerId];
    discardedCardOwner.discardPile.push(discardedCard.id);
    return nextState;
  }

  const _eliminateCard = (targetIndex, resolvingCard, influenceGain, prevState) => {
    console.log('GameManager._eliminateCard()');
    const nextState = {...prevState};
    const { players, queue, queueResolutionIndex:qri } = nextState;
    const targetStack = queue[targetIndex];
    const targetCard = targetStack.pop();
    // if we now have an empty stack, remove it completely
    if (_getTopCardInStack(queue, targetIndex) === undefined) {
      queue.splice(targetIndex, 1);
      // compensate if splice occurs before / on current qri, otherwise card will be missed
      if (targetIndex <= qri) {
        nextState.queueResolutionIndex -= 1;
      }
    }
    // STAYS SAME EVEN IF AMBUSH IS TARGET CARD
    const targetCardOwner = players[targetCard.ownerId];
    targetCardOwner.discardPile.push(targetCard.id);
    const resolvingCardOwner = players[resolvingCard.ownerId];
    resolvingCardOwner.influence += influenceGain;
    return nextState;
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
        discardPile: [],
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

  const dontRevealCard = (qri) => {
    console.log('GameManager.dontRevealCard() at queue index: ', qri);
    let nextState = {..._gameState};
    const card = _getTopCardInStack(nextState.queue, qri);
    card.influence += 1;
    // next player / advance round
    nextState.queueResolutionIndex += 1;
    // TODO: save old gameState in history / DB
    _gameState = _checkForNextRound(nextState);
  }

  const revealCard = (qri) => {
    console.log('GameManager.revealCard() at queue index: ', qri);
    const nextState = {..._gameState};
    const { queue } = nextState;
    const card = _getTopCardInStack(queue, qri);
    const owner = nextState.players[card.ownerId];
    console.log('card: ', card.name);
    card.revealed = true;
    // TODO: send message saying 'PLAYER revealed CARD.'
    const influenceGain = cardHelper.getInfluenceGainOnReveal(card);
    owner.influence += influenceGain;
    card.influence = 0;
    // TODO: send message saying 'PLAYER gained INFLUENCE influence accumulated on CARD.'
    nextState.queueTargets = cardHelper.getTargetsForAbility(card, queue, qri);
    // TODO: send message saying 'PLAYER is resolving CARD ability.'
    // TODO: save old gameState in history / DB
    _gameState = nextState;
  }

  const confirmTarget = (targetIndex) => {
    console.log('GameManager.confirmTarget() at queue index: ', targetIndex);
    const { queue, queueResolutionIndex:qri } = _gameState;
    const resolvingCard = _getTopCardInStack(queue, qri);
    console.log('resolvingCard: ', resolvingCard.name);
    // TODO: send message saying 'PLAYER revealed CARD.'
    const action = cardHelper.getActionForAbility(resolvingCard, queue, qri);
    // TODO: Royal Decree - needs further prompt from user, should do anyway
    // to alert other players of final choice
    let nextState;
    switch (action.type) {
      case CARD_EFFECTS.NONE:
        nextState = {..._gameState};
        break;
      case CARD_EFFECTS.ELIMINATE:
        nextState = _eliminateCard(targetIndex, resolvingCard, action.influenceGain, _gameState);
        break;
      case CARD_EFFECTS.GAIN_INFLUENCE:
        nextState = _gainInfluence(action.influenceGain, resolvingCard, _gameState);
        break;
      case CARD_EFFECTS.STEAL:
        nextState = _stealFrom(targetIndex, resolvingCard, _gameState);
        break;
      case CARD_EFFECTS.MOVE:
        // TODO: implement
        nextState = {..._gameState};
        break;
      case CARD_EFFECTS.COPY_ABILITY:
        // TODO: implement
        nextState = {..._gameState};
        break;
    }
    _checkDiscardAfterAbility(nextState);
  }

  const _checkDiscardAfterAbility = (prevState) => {
    let nextState = {...prevState};
    const { queue, queueResolutionIndex:qri } = nextState;
    const resolvingCard = _getTopCardInStack(queue, qri);
    if (resolvingCard) {
      // if there isn't a resolvingCard, it has eliminated itself!!
      // can happen with e.g. Assassination, or Soldier and Archer who may be forced to
      const toDiscard = cardHelper.getDiscardAfterAbility(resolvingCard, queue, qri);
      if (toDiscard) {
        nextState = _discardCardAfterAbility(nextState);
      }
    }
    // next player / advance round
    nextState.queueResolutionIndex += 1;
    // TODO: save old gameState in history / DB
    nextState = _checkForNextRound(nextState);
    nextState.queueTargets = [];
    // TODO: send message saying 'PLAYER is resolving CARD ability.'
    // TODO: save old gameState in history / DB
    _gameState = nextState;
  }

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
    dontRevealCard,
    revealCard,
    confirmTarget,
    // queueBeforeAbility,
    // queueOnAbility,
    // queueAfterAbility,
  }
}

module.exports = GameManager;