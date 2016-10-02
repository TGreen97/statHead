var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stats_MLB_PitchingSchema = new Schema({
  rank: {
    type: Number,
  },
  name: {
    type: String,
  },
  team: {
    type: String,
  },
  kPer9: {
    type: Number,
  },
  bbPer9: {
    type: Number,
  },
  kToBB: {
    type: Number,
  },
  hrPer9: {
    type: Number,
  },
  kPct: {
    type: String,
  },
  bbPct: {
    type: String,
  },
  kBBPct: {
    type: String,
  },
  aVGAg: {
    type: Number,
  },
  wHIP: {
    type: Number,
  },
  bABIP: {
    type: Number,
  },
  lOBPct: {
    type: String,
  },
  eRAMinus: {
    type: Number,
  },
  fIPMinus: {
    type: Number,
  },
  xFIPMinus: {
    type: Number,
  },
  eRA: {
    type: Number,
  },
  fIP: {
    type: Number,
  },
  eToFIP: {
    type: Number,
  },
  xFIP: {
    type: Number,
  },
  sIERA: {
    type: Number,
  }
});

var Stats_MLB_Pitching = mongoose.model('Stats_MLB_Pitching', stats_MLB_PitchingSchema);
module.exports = Stats_MLB_Pitching;