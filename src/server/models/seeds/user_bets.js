//edit to reflect user bet model
var Bet = require('../bet_slip');
var passport = require('passport');

var seedUserBets = function(){
  Bet.find({}, function(err, documents){
    if(documents.length === 0){

      var betsArray = [
        {author: 'AndrewOboro', stake: 40, match_stake: 40, returns: 72, matched: false},
        {author: 'Theo', stake: 100, match_stake: 100, returns: 180, matched: false},
        {author: 'Mk', stake: 40, match_stake: 60, returns: 90, matched: false},
        {author: 'KyleWalker', stake: 10, match_stake: 10, returns: 18, matched: false},
        {author: 'AhirzI', stake: 1000, match_stake: 20, returns: 988, matched: false}
      ];

      for (var i = 0; i < betsArray.length; i++){
        var bet = new Bet(
            {
              author: betsArray[i].author,
              stake: betsArray[i].stake,
              match_stake: betsArray[i].match_stake,
              returns: betsArray[i].returns,
              matched: betsArray[i].matched
            }
          );
        bet.save();
        }
      console.log('Dummy bets added successfully!');
      }
    });
};

module.exports = seedUserBets;