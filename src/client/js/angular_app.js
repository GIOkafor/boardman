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
	$scope.games = [];
	$scope.details = false;

	//functions
	$scope.showGames = function(sport, league){
		console.log("Showing leagues");
		var promise = FixturesFactory.getGames(sport, league);
		promise.then(function(payload){
			console.log(payload);
			//$state.go('fixtures', {games: payload.data});
			$scope.games = payload;
		})
	}

	$scope.showDetails = function(){
		if($scope.details == false)
		$scope.details = true;
	else
		$scope.details=false;
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
		var url = "https://api.stattleship.com/" + sport + "/" + league + "/games";
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