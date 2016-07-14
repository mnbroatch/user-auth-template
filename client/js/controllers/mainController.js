"use strict;"

angular.module('user-auth')
.controller('mainController', function($scope, authService) {

	authService.readToken();
	

	$scope.logout = () => {
		authService.logout();
	};

});



