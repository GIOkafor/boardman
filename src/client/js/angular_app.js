/*
var StattleshipAPI = require('node-stattleship');
var stattleship = new StattleshipAPI('34d56c576cb68e5af75f5c6667a3f0e2');
*/
angular
	.module('app', ['ui.router'])
	.controller('BetCreationController', BetCreationController)
	.factory('FixturesFactory', FixturesFactory)
	.config(function($stateProvider){
		var leaguesState = {
			name: 'leagues',
			url: '/leagues',
			templateUrl: '../views/leagues.html'
		}

		var fixturesState = {
			name: 'fixtures',
			url: '/fixtures',
			templateUrl: '../views/fixtures.html',
			params: {
				games: null
			} 
		}
		
		var fixtureDetailsState = {
			name: 'fixture_details',
			url: 'fixture-details',
			templateUrl: '../views/fixture_details.html'
		}

		$stateProvider.state(leaguesState);
		$stateProvider.state(fixturesState);
		$stateProvider.state(fixtureDetailsState);
	});

//injectables-go-here
BetCreationController.$inject = ['FixturesFactory'];

function BetCreationController(FixturesFactory) {
	/*jshint validthis:true*/
    var vm = this;

    vm.data = [];
    vm.outcomes = [];
	vm.details = false;
    vm.showing = '';
    vm.away_team = '';
	vm.home_team ='';

	//functions

	//shows fixtures happening today
	vm.showGames = function(sport, league){
		console.log("Showing leagues");
		var promise = FixturesFactory.getGames(sport, league);
		promise.then(function(payload){
			console.log(payload);
			vm.data = payload;
		})
	}

//hides or shows more details ad options regarding games
	vm.showDetails = function(game){
		//testing code
        console.log("Name is "+game.name);
        console.log("Clicked ID is "+ game.id);
        console.log("Showing ID is "+ vm.showing);
        console.log("Details status is "+ vm.details);

        if(vm.showing != game.id && vm.details == false){
            vm.details = true;
            vm.showing = game.id;
        }
        else if(vm.showing == game.id && vm.details == true){
            vm.details = false;
        }
        //the same && false
        else if(vm.showing == game.id && vm.details == false){
            vm.details = true;
        }
        //different && true
        else if(vm.showing != game.id && vm.details == true){
            vm.showing = game.id;
        }

        //call the parser to get home and away teams
        var teams = getTeamName(game.title);
        vm.away_team = (teams[0]);
        vm.home_team = (teams[1]);

        //testing code
        console.log(vm.away_team);
        console.log(vm.home_team);
	}

	vm.saveOutcome = function(team, result){
		var outcome = team + " " + result;
		
		if(vm.outcomes.indexOf(outcome) == -1){
			vm.outcomes.push(outcome);
			console.log(vm.outcomes);
		}
		else
			console.log("Item already in bet slip");
	}

//parses team name from title
	function getTeamName(title){
		var teams = title.split(" vs ");
		return teams;
	}

}

function FixturesFactory($http){
	var games= '';

	var fixtures = {
		getGames: getGames
	};

	return fixtures;

	//////////////////////////////

	function getGames(sport, league){
		var url = "https://api.stattleship.com/" + sport + "/" + league + "/games?on=today";
		var custom_headers = {
			headers :{
				'Authorization': 'Token token=34d56c576cb68e5af75f5c6667a3f0e2',
				'Content-Type': 'application/json',
  				'Accept': 'application/vnd.stattleship.com; version=1'
			}
		}

		return $http.get(url, custom_headers).then(function successCallBack(response){
					//testing code start
					console.log("Successfully retrieved data");
					//console.log(response.data.games);
					//testing code end


					//main here
					//store array of games
					games = response.data;
					return games;

				}, function errorCallBack(){
						console.log("Failed to retrieve data");
					}
		);
	}
}