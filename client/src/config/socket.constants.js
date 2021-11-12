export const SOCKET_EVENTS = {
  CONNECTIVITY: {
    CONNECT: 'connect',
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
    DISCONNECTING: 'disconnecting',

  },
  GAME: {
    GAMESTATE_CHANGED: 'game.gamestate_changed',
    GAMESTATE_GET: 'game.gamestate_get',
    PLANNING: {
      PLAY_CARD: 'game.planning.play_card',
    },
    ROUND_START: 'game.round_start',
  },
  LOBBY: {
    GAME_START: 'lobby.game_start',
    GAME_STARTING: 'lobby.game_starting',
    GAME_STARTED: 'lobby.game_started',
    ROOM_CREATE: 'lobby.room_create',
    ROOM_CREATED: 'lobby.room_created',
    ROOM_JOIN: 'lobby.room_join',
    ROOM_LEAVE: 'lobby.room_leave',
    ROOMS_CHANGED: 'lobby.rooms_changed',
    ROOMS_GET: 'lobby.rooms_get',
  },
  MESSAGE: {
    CREATE: 'message.create',
  },
};