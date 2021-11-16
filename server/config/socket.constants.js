const SOCKET_EVENTS = {
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
    RESOLUTION: {
      QUEUE: {
        CONFIRM_INTERRUPT: 'game.queue.confirm_interrupt',
        CONFIRM_DISCARD: 'game.queue.confirm_discard',
        CONFIRM_NO_TARGET: 'game.queue.confirm_no_target',
        CONFIRM_TARGET: 'game.queue.confirm_target',
        CONFIRM_TARGET_SELF: 'game.queue.confirm_target_self',
        NO_REVEAL: 'game.queue.no_reveal',
        REVEAL: 'game.queue.reveal',
      }
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

module.exports = SOCKET_EVENTS;