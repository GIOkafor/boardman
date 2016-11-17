var express = require('express');
var router = express.Router();
var helpers = require('../lib/helpers');
var Bet = require('../models/bet_slip');

router.get('/', function(req, res, next) {
  Bet.findQ()
  .then(function(bets){
  	res.render('index', {
    	user: req.user,
    	message: req.flash('message')[0],
    	bets: bets
  	});
  })
  .catch(function(err){
  	return next(err);
  })
  .done();
});

router.get('/ping', function(req, res, next) {
  res.send("pong!");
});

/*
//Direct transition to bets paused for now
// get all user created bets
router.get('/bets', function(req, res, next){
  Bet.findQ()
  .then(function(bets){
    res.status(200)
    .render('partials/user_bets', {bets: bets});
  })
  .catch(function(err){
    return next(err);
  })
  .done();
});
*/

router.get('/create-new-bet', helpers.ensureAuthenticated, function(req, res, next){
	res.render('create_bet', {
		user: req.user
	});
});

module.exports = router;
