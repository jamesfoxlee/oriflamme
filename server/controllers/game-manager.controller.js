const { v1: uuidv1 } = require('uuid');

const { Room } = require('../models/room.model');
const helpers = require('../helpers/game.helpers');

const {
  INITIAL_GAMESTATE,
  INITIAL_PLAYERSTATE,
  STARTING_HAND_SIMPLE,
  PHASES,
  PLAYER_IMAGES,
  PLAYER_COLORS
} = require('../config/game.constants')

function GameManager () {

  let _gameState = null;
  const _history = [];

  // const INITIAL_GAMESTATE = {
  //   activePlayerId: null,
  //   firstPlayerIndex: 0,
  //   numPlayers: 0,
  //   phase: 'planning',
  //   planningPhasePlayed: 0,
  //   players: {},
  //   queue: [],
  //   queueResolutionIndex: 0,
  //   round: 1,
  //   turnOrder: [],
  //   turnOrderIndex: 0
  // }

  // PRIVATE

  const _nextResolutionPhase = (prevGS) => {
    console.log('GameManager._nextResolutionPhase()');
    const firstQueueCard = prevGS.queue[0][0];
    console.log(`firstQueueCard: name: ${firstQueueCard.name} owner: ${firstQueueCard.ownerId}`);
    const gs = {
      ...prevGS,
      activePlayerId: firstQueueCard.ownerId,
      phase: PHASES.RESOLUTION,
    };
    return gs;
  }

  const _nextRound = (prevGS) => {
    console.log('GameManager._nextRound()');
    const updatedTurnOrder = prevGS.turnOrder.slice(1).concat(prevGS.turnOrder.slice(0, 1));
    const gs = {
      ...prevGS,
      activePlayerId: updatedTurnOrder[0],
      phase: PHASES.PLANNING,
      planningPhasePlayed: 0,
      queueResolutionIndex: 0,
      round: prevGS.round + 1,
      turnOrder: updatedTurnOrder,
      turnOrderIndex: 0
    };
    return gs;
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
    players.forEach(player => {
      turnOrder.push(player.id);
      playersObj[player.id] = {
        ...INITIAL_PLAYERSTATE,
        id: player.id,
        color: colors.shift(),
        hand: [...STARTING_HAND_SIMPLE],
        imageUrl: images.shift(),
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
  }

  const getGameState = () => _gameState;

  const playCard = (cardPlayed, position) => {
    console.log('GameManager.playCard() to position: ', position);
    console.log(cardPlayed);

    // update hand of player that played card
    let gs = {..._gameState};
    console.log('queue before insert');
    console.log(gs.queue);
    const playerId = cardPlayed.ownerId;
    const player = gs.players[playerId];
    const updatedHand = player.hand.filter(handCardId => handCardId !== cardPlayed.id);
    player.hand = updatedHand;
    // NB must add card to queue inside an array - queue is nested arrays!
    // TODO: implement adding to stack here
    gs.queue.splice(position, 0, [cardPlayed]);
    console.log('queue after insert');
    console.log(gs.queue);
    // check for advance to Resolution Phase
    gs.planningPhasePlayed += 1;
    if (gs.planningPhasePlayed === gs.numPlayers) {
      gs = _nextResolutionPhase(gs);
    } else {
      gs.turnOrderIndex += 1;
      gs.activePlayerId = gs.turnOrder[gs.turnOrderIndex];
      /*
      // if wrap logic required
      let idx = gs.turnOrderIndex + 1;
      idx = idx === gs.numPlayers ? 0 : idx;
      gs.turnOrderIndex = idx;
      gs.activePlayerId = gs.turnOrder[idx];
      */
    }
    // update the gameState
    // TODO: save old gameState in history / DB
    console.log('returning from playCard, queue follows...');
    console.log(gs.queue);
    _gameState = gs;
  }

  return {
    getGameState,
    initialise,
    playCard
  }
}

module.exports = GameManager;