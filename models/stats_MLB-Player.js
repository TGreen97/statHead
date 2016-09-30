var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stats_MLBPlayerSchema = new Schema({
  rank: {
    type: Number,
  },
  name: {
    type: String,
  },
  team: {
    type: String,
  },
  games: {
    type: Number,
  }
  // games: {
  //   type: Number,
  // },
  // minsPlayed: {
  //   type: Number,
  // },
  // perRtg: {
  //   type: Number,
  // },
  // trShtPct: {
  //   type: Number,
  // },
  // threePtAttRt: {
  //   type: Number,
  // },
  // ftAttRt: {
  //   type: Number,
  // },
  // offRebPct: {
  //   type: Number,
  // },
  // defRebPct: {
  //   type: Number,
  // },
  // totalRebPct: {
  //   type: Number,
  // },
  // asstPct: {
  //   type: Number,
  // },
  // stelPct: {
  //   type: Number,
  // },
  // blokPct: {
  //   type: Number,
  // },
  // trnOverPct: {
  //   type: Number,
  // },
  // usagePct: {
  //   type: Number,
  // },
  // offWinShare: {
  //   type: Number,
  // },
  // defWinShare: {
  //   type: Number,
  // },
  // totWinShare: {
  //   type: Number,
  // },
  // p48WinShare: {
  //   type: Number,
  // },
  // offPlusMinus: {
  //   type: Number,
  // },
  // defPlusMinus: {
  //   type: Number,
  // },
  // boxPlusMinus: {
  //   type: Number,
  // },
  // vORP: {
  //   type: Number,
  // }
  // war: {
  //   type: Number
  // }
});

var Stats_MLB_Player = mongoose.model('Stats_MLB_Player', stats_MLBPlayerSchema);
module.exports = Stats_MLB_Player;