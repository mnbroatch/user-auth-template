"use strict;"

angular.module('user-auth')
.controller('thingController', function($scope,$http,thingService,$rootScope) {

	$scope.thingArray =[];

	thingService.getAllOfUser($rootScope.currentUser._id)
	.then( function(things){
		console.log('things',things);
		if(things) {
			$scope.thingArray = things;
		}
	})
	.catch( err => {
		console.log(err);
	});

	$scope.addOneThing = function(thing){
		thingService.addOne(thing,$rootScope.currentUser)
		.then( function(newThing){
			if(newThing) $scope.thingArray.push(newThing);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.removeOneThing = function(thing){
		let index = $scope.thingArray.indexOf(thing);
		thingService.removeOne(thing)
		.then( function(){
			$scope.thingArray.splice(index,1);
		})
		.catch( err => {
			console.log(err);
		});
	}

	$scope.editOneThing = function(editedThing){
		console.log(editedThing);
		thingService.editOne(editedThing)
		.then( function(updatedThing){
			console.log('edited');
		})
		.catch( err => {
			console.log(err);
		});
	}


});



