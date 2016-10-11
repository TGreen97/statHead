var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stats_NFL_TeamSchema = new Schema({
  rank: {
    type: String,
  },
  teamName: {
    type: String,
  },
  totDVOA: {
    type: String,
  },
  lastWkRkg: {
    type: String,
  },
  totDAVE: {
    type: String,
  },
  dAVERank: {
    type: String,
  },
  record: {
    type: String,
  },
  offDVOA: {
    type: String,
  },
  offRank: {
    type: String,
  },
  defDVOA: {
    type: String,
  },
  defRank: {
    type: String,
  },
  specTeamDVOA: {
    type: String,
  },
  specTeamRank: {
    type: String,
  }
});

var Stats_NFL_Team = mongoose.model('Stats_NFL_Team', stats_NFL_TeamSchema);
module.exports = Stats_NFL_Team;