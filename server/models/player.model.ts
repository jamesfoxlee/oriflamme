const db = require('./db');
const { Schema } = db;

// {
//   id: 'al',
//   color: 'hsla(0, 100%, 55%, 1)',
//   discardPile: [],
//   hand: ['archer', 'assassinate', 'conspiracy', 'heir', 'lord', 'soldier', 'spy'],
//   // hand: ['ambush', 'archer', 'assassinate', 'conspiracy', 'heir', 'lord', 'royal_decree', 'shapeshifter', 'soldier', 'spy'],
//   imageUrl: 'https://i.pinimg.com/originals/9f/0f/b8/9f0fb83b052da2fe53003f26ce1bf0b1.jpg',
//   influence: 0,
//   name: 'Alan',
// }

const PlayerSchema = mongoose.Schema({
  id: { type: String, required: true },
  color: String,
  discardPile: { type: [String], default: [] },
  hand: { type: [String], default: [] },
  imageUrl: String,
  influence: { type: Number, default: 0 },
  name: String
});

const Player = db.model('Player', PlayerSchema);

module.exports = {
  Player,
  PlayerSchema
}