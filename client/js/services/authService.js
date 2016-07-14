"use strict;"

var app = angular.module('user-auth');

app.service('authService', function($http, $rootScope, $cookies, $state, TOKENNAME) {

	this.authorize = ()=>{
		return $http.post('/api/auth/authorize',{}, (err,res)=>{
			console.log('asd');
		});
	}

	this.readToken = () => {
		let token = $cookies.get(TOKENNAME);

		if(typeof token === 'string') {
			let payload = JSON.parse(atob(token.split('.')[1]));
			$rootScope.currentUser = payload;
		}
	};

	this.register = userObj => {
		return $http.post('/api/auth/register', userObj);
	};

	this.login = userObj => {
		return $http.post('/api/auth/login', userObj)  
		.then(res => {
			$rootScope.currentUser = res.data;
			return res;
		});
	};

	this.logout = () => {
		$cookies.remove(TOKENNAME);
		$rootScope.currentUser = null;
		$state.go('home');
	};

});
