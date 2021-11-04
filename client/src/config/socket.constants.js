const EVENTS = {
  CONNECTIVITY: {
    CONNECT: 'connect',
    CONNECTION: 'connection',
    DISCONNECTING: 'disconnecting',
    DISCONNECT: 'disconnect'

  },
  LOBBY: {
    GET_ROOMS: 'lobby-get-rooms',
    CREATE_ROOM: 'lobby-create',
    CREATE_ROOM_SUCCESS: 'lobby-create-success',
    ROOMS_CHANGED: 'lobby-changed',
  },
  MESSAGE: {
    CREATE: 'message-create',
  },
};

module.exports = {
  EVENTS,
}