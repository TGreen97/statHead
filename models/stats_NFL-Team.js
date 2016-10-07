var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stats_NFL_TeamSchema = new Schema({
  rank: {
    type: Number,
  },
  teamName: {
    type: String,
  },
  totDVOA: {
    type: String,
  },
  lastWkRkg: {
    type: Number,
  },
  totDAVE: {
    type: String,
  },
  dAVERank: {
    type: Number,
  },
  record: {
    type: String,
  },
  offDVOA: {
    type: String,
  },
  offRank: {
    type: Number,
  },
  defDVOA: {
    type: String,
  },
  defRank: {
    type: Number,
  },
  specTeamDVOA: {
    type: String,
  },
  specTeamRank: {
    type: Number,
  }
});

var Stats_NFL_Team = mongoose.model('Stats_NFL_Team', stats_NFL_TeamSchema);
module.exports = Stats_NFL_Team;