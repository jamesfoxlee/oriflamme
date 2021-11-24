const db = require("./db");
const { Schema } = db;

const PlayerSchema = mongoose.Schema({
  id: { type: String, required: true },
  color: String,
  discardPile: { type: [String], default: [] },
  hand: { type: [String], default: [] },
  imageUrl: String,
  influence: { type: Number, default: 0 },
  name: String,
});

const Player = db.model("Player", PlayerSchema);

module.exports = {
  Player,
  PlayerSchema,
};
