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

  const _advancePhase = (prevGameState) => {
    console.log('GameManager._advancePhase()');
    const gs = {...prevGameState};
    // things
    return gs;
  }

  const _advanceRound = (prevGameState) => {
    console.log('GameManager._advanceRound()');
    const gs = {...prevGameState};
    // things
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
    console.log('GameManager.playCard()');
    // update hand of player that played card
    let gs = {..._gameState};
    const playerId = cardPlayed.ownerId;
    const player = gs.players[playerId];
    const updatedHand = player.hand.filter(handCardId => handCardId !== cardPlayed.id);
    player.hand = updatedHand;
    // TODO: implement adding to stack here
    // remember: queue is an array of arrays! For future stack functionality
    gs.queue.splice(position, 0, [cardPlayed]);

    // have all players played a card this phase?
    gs.planningPhasePlayed += 1;

    // TODO: ** SATURDAY MORNING **
    // uncomment if, work on phase

    // if (gs.planningPhasePlayed === gs.numPlayers) {
    //   gs = _advancePhase(gs);
    // } else {
      // get next player
      // we only manipulate turnOrder array on a new round occurring
      let idx = gs.turnOrderIndex + 1;
      console.log('idx after inc, before wrap check: ', idx);
      idx = idx === gs.numPlayers ? 0 : idx;
      console.log('idx after inc, after wrap check: ', idx);
      gs.turnOrderIndex = idx;
      gs.activePlayerId = gs.turnOrder[idx];
    // }
    // update the gameState
    _gameState = gs;
  }

  return {
    getGameState,
    initialise,
    playCard
  }
}

module.exports = GameManager;