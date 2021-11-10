export const SOCKET_EVENTS = {
  CONNECTIVITY: {
    CONNECT: 'connect',
    CONNECTION: 'connection',
    DISCONNECTING: 'disconnecting',
    DISCONNECT: 'disconnect'

  },
  LOBBY: {
    GET_ROOMS: 'lobby.get_rooms',
    CREATE_ROOM: 'lobby.create',
    CREATE_ROOM_SUCCESS: 'lobby.create_room_success',
    JOIN_ROOM: 'lobby.join_room',
    ROOMS_CHANGED: 'lobby.rooms_changed',
  },
  MESSAGE: {
    CREATE: 'message.create',
  },
};