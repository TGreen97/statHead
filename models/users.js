var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
  userID: {
    type: String,
  },
  name: {
    type: String,
  },
  date: {
    type: Date
  }
});

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;