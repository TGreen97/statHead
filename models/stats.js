var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statsSchema = new Schema({
  title: {
    type: String,
  },
  link: {
    type: String,
  }
  // war: {
  //   type: Number
  // }
});

var Stats = mongoose.model('Stats', statsSchema);
module.exports = Stats;