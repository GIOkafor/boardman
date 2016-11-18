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

function BetCreationController($scope, $state, FixturesFactory) {

	//functions
	$scope.showLeagues = function(){
		console.log("Showing leagues");
		var promise = FixturesFactory.getGames();
		promise.then(function(payload){
			console.log(payload);
			$state.go('fixtures', {games: payload.data});
		})
	}
}

function FixturesFactory($http){
	var games= '';

	var fixtures = {
		getGames: getGames
	};

	return fixtures;

	//////////////////////////////

	function getGames(){
		var url = "https://api.stattleship.com/baseball/mlb/games";
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
					games = response.data.games;
					return games;

				}, function errorCallBack(){
						console.log("Failed to retrieve data");
					}
		);
	}
}