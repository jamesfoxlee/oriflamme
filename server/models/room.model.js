const db = require('./db');
const { Schema } = db;

const RoomSchema = db.Schema({
  roomId: { type: String, required: true },
  ownerId: { type: String, required: true },
  ownerName: { type: String, required: true },
  roomName: { type: String, required: true },
  players: [{
    id: { type: String, required: true },
    name: { type: String, required: true }
  }]
});

const Room = db.model('Room', RoomSchema);

module.exports = {
  Room,
  RoomSchema
};