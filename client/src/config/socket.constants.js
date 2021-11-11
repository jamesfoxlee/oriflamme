export const SOCKET_EVENTS = {
  CONNECTIVITY: {
    CONNECT: 'connect',
    CONNECTION: 'connection',
    DISCONNECTING: 'disconnecting',
    DISCONNECT: 'disconnect'

  },
  GAME: {
    GAME_STARTING: 'game.game_starting',
    ROUND_START: 'game.round_start',
  },
  LOBBY: {
    GET_ROOMS: 'lobby.get_rooms',
    CREATE_ROOM: 'lobby.create',
    CREATE_ROOM_SUCCESS: 'lobby.create_room_success',
    JOIN_ROOM: 'lobby.join_room',
    LEAVE_ROOM: 'lobby.leave_room',
    ROOMS_CHANGED: 'lobby.rooms_changed',
    START_GAME: 'lobby.start_game'
  },
  MESSAGE: {
    CREATE: 'message.create',
  },
};