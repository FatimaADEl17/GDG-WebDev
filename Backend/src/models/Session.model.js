const mongoose = require("mongoose");

const CellSchema = new mongoose.Schema(
{
  id: String,
  letter: String,
  row: Number,
  col: Number,
  claimedBy: { type: String, default: "" },
  status: { type: String, default: "empty" },
  lastAnswer: { type: String, default: "" }
},
{ _id: false }
);

const SessionSchema = new mongoose.Schema(
{
  sessionId: { type: String, unique: true, index: true },
  difficulty: String,
  status: String,
  nowPlaying: String,
  turnEndsAt: Date,
  teams: {
    green: { name: String, score: Number, words: Number },
    blue: { name: String, score: Number, words: Number }
  },
  cells: [CellSchema],
  winner: String,
  stats: {
    totalWords: Number,
    lastMoveAt: Date
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("Session", SessionSchema);