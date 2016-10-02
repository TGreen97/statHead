var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stats_MLB_BattingSchema = new Schema({
  rank: {
    type: Number,
  },
  name: {
    type: String,
  },
  team: {
    type: String,
  },
  bbPerK: {
    type: Number,
  },
  plateApps: {
    type: Number,
  },
  aVG: {
    type: Number,
  },
  oBP: {
    type: Number,
  },
  sLGPct: {
    type: Number,
  },
  oPS: {
    type: Number,
  },
  bbPct: {
    type: String,
  },
  kPct: {
    type: String,
  },
  iSO: {
    type: Number,
  },
  bABIP: {
    type: Number,
  },
  sPd: {
    type: Number,
  },
  uBR: {
    type: Number,
  },
  wGDP: {
    type: Number,
  },
  wSB: {
    type: Number,
  },
  wRC: {
    type: Number,
  },
  wRAA: {
    type: Number,
  },
  wOBA: {
    type: Number,
  },
  wRCPlus: {
    type: Number,
  }
});

var Stats_MLB_Batting = mongoose.model('Stats_MLB_Batting', stats_MLB_BattingSchema);
module.exports = Stats_MLB_Batting;