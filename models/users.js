var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  userID: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
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
  id_token: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;