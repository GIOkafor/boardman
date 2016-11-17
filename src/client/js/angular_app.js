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
			template: '../views/fixtures.html'
		}
		
		var fixtureDetailsState = {
			name: 'fixture_details',
			url: 'fixture-details',
			template: '../views/fixture_details.html'
		}

		$stateProvider.state(leaguesState);
		$stateProvider.state(fixturesState);
		$stateProvider.state(fixtureDetailsState);
	});

function BetCreationController($scope) {

	//functions
	$scope.showLeagues = function(){
		console.log("Leagues clicked");
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

		$http.get(url, {
			headers :{
				'Authorization': 'Token token=d46712663c6d9bff207779561f576a50'
			}
		}).then(successCallback, errorCallback);

		function successCallBack(){
			console.log("Successfully retrieved data");
		}

		function errorCallBack(){
			console.log("Failed to retrieve data");
		}
	}
}