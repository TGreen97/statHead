var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  // userID: {
  //   type: String,
  //   unique: true,
  // },
  // name: {
  //   type: String,
  // },
  // email: {
  //   type: String,
  //   unique: true,
  google  : {
    id    : String,
    token : String,
    email : String,
    name  : String
  },
  nflTeam: {
    type: String,
  },
  mlbTeam: {
    type: String,
  },
  nbaTeam: {
    type: String,
  },
  _favNFL:
    [{ type: Schema.Types.ObjectId, ref: 'Stats_NFL_Team'}],
  _favMLBPitch:
    [{ type: Schema.Types.ObjectId, ref: 'Stats_MLB_Pitching'}],
  _favMLBHit:
    [{ type: Schema.Types.ObjectId, ref: 'Stats_MLB_Batting'}],
  _favNBA:
    [{ type: Schema.Types.ObjectId, ref: 'Stats_NBA_Player'}],
  date: {
    type: Date,
    default: Date.now
  }
});

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;