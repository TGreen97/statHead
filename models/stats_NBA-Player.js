var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stats_NBAPlayerSchema = new Schema({
  player: {
    type: String,
  },
  position: {
    type: String,
  },
  age: {
    type: Number,
  },
  team: {
    type: String,
  },
  games: {
    type: Number,
  },
  minsPlayed: {
    type: Number,
  },
  perRtg: {
    type: Number,
  },
  trShtPct: {
    type: Number,
  },
  threePtAttRt: {
    type: Number,
  },
  ftAttRt: {
    type: Number,
  },
  offRebPct: {
    type: Number,
  },
  defRebPct: {
    type: Number,
  },
  totalRebPct: {
    type: Number,
  },
  asstPct: {
    type: Number,
  },
  stelPct: {
    type: Number,
  },
  blokPct: {
    type: Number,
  },
  trnOverPct: {
    type: Number,
  },
  usagePct: {
    type: Number,
  },
  offWinShare: {
    type: Number,
  },
  defWinShare: {
    type: Number,
  },
  totWinShare: {
    type: Number,
  },
  p48WinShare: {
    type: Number,
  },
  offPlusMinus: {
    type: Number,
  },
  defPlusMinus: {
    type: Number,
  },
  boxPlusMinus: {
    type: Number,
  },
  vORP: {
    type: Number,
  }
  // war: {
  //   type: Number
  // }
});

var Stats_NBA_Player = mongoose.model('Stats_NBA_Player', stats_NBAPlayerSchema);
module.exports = Stats_NBA_Player;