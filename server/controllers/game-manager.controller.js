const { v1: uuidv1 } = require('uuid');

const { Room } = require('../models/room.model');

const {
  INITIAL_GAMESTATE,
  INITIAL_PLAYERSTATE,
  STARTING_HAND_SIMPLE,
  PLAYER_IMAGES,
  PLAYER_COLORS
} = require('../config/game.constants')

function GameManager () {

  let _gameState = null;

  // const INITIAL_GAMESTATE = {
  //   activePlayerId: null,
  //   phase: 'planning',
  //   players: [],
  //   queue: [],
  //   queueResolutionIndex: 0,
  //   round: 0,
  //   turnOrder: []
  // }


  const initialise = (room) => {

    // TODO: card randomisation
    // TODO: first player randomisation
    // TODO: extract into helper
    // TODO: FY shuffle helper

    console.log('GameManager.initialise()');
    const { players, roomId } = room;
    const colors = [...PLAYER_COLORS];
    const images = [...PLAYER_IMAGES];
    const turnOrder = [];

    const updatedPlayers = players.map(player => {
      turnOrder.push(player.id);
      return {
        ...INITIAL_PLAYERSTATE,
        id: player.id,
        color: colors.shift(),
        hand: [...STARTING_HAND_SIMPLE],
        imageUrl: images.shift(),
        influence: 1,
        name: player.name,
      }
    })

    _gameState = {
      ...INITIAL_GAMESTATE,
      activePlayerId: updatedPlayers[0].id,
      players: updatedPlayers,
      queue: [],
      queueResolutionIndex: 0,
      round: 0,
      turnOrder: turnOrder
    }
  }

  const getGameState = () => _gameState;

  return {
    getGameState,
    initialise,
  }
}

module.exports = GameManager;