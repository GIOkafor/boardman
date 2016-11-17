var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bet = new Schema({
  author: String,
  stake: Number,
  match_stake: Number,
  returns: Number,
  matched: {
    type: Boolean,
    default: false
  },
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('bet', Bet);