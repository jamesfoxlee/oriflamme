const INITIAL_GAMESTATE = {
  activePlayerId: null,
  firstPlayerIndex: 0,
  numPlayers: 0,
  phase: 'planning',
  planningPhasePlayed: 0,
  players: {},
  queue: [],
  queueResolutionIndex: 0,
  round: 1,
  turnOrder: [],
  turnOrderIndex: 0
}

const INITIAL_PLAYERSTATE = {
  id: null,
  color: null,
  discardPile: [],
  hand: null,
  imageUrl: null,
  influence: 1,
  name: null,
}

const PHASES = {
  PLANNING: 'planning',
  RESOLUTION: 'resolution',
};

const PLAYER_IMAGES = [
  'https://i.pinimg.com/originals/de/ed/59/deed59f7d0312b416c4cfd1fe5bdbeb2.jpg',  // dude with chalice
  'https://i.pinimg.com/originals/7a/ae/c8/7aaec855ca19276f3884f6b7655fdc33.jpg',  // dude crouching with sword
  'https://i.pinimg.com/originals/4b/32/e0/4b32e059371a41575518199729c7dfaa.jpg',  // brunette lady
  'https://i.pinimg.com/736x/cd/0a/48/cd0a4811395c05bf10170e7e15fc3c9b.jpg',       // lady in black
  'https://i.pinimg.com/originals/9f/0f/b8/9f0fb83b052da2fe53003f26ce1bf0b1.jpg',  // redhead lady
];

const PLAYER_COLORS = [
  'hsla(0, 0%, 44%, 1)',     // grey
  'hsla(235, 100%, 48%, 1)', // blue
  'hsla(114, 100%, 30%, 1)', // green
  'hsla(0, 100%, 55%, 1)',   // red
  'hsla(273, 100%, 25%, 1)', // purple
];

const STARTING_HAND_FULL = [
  'ambush',
  'archer',
  'assassinate',
  'conspiracy',
  'heir',
  'lord',
  'royal_decree',
  'shapeshifter',
  'soldier',
  'spy'
];

const STARTING_HAND_SIMPLE = [
  'archer',
  'assassinate',
  'conspiracy',
  'heir',
  'lord',
  'soldier',
  'spy'
];

module.exports = {
  INITIAL_GAMESTATE,
  INITIAL_PLAYERSTATE,
  PHASES,
  PLAYER_IMAGES,
  PLAYER_COLORS,
  STARTING_HAND_FULL,
  STARTING_HAND_SIMPLE,
}