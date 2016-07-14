"use strict;"

var app = angular.module('user-auth', ['ui.bootstrap','ui.router','xeditable','ngCookies']); 

app.constant('TOKENNAME', 'authtoken');

app.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: '/html/home.html',
	})
	.state('user', {
		url: '/user', 
		templateUrl: 'html/user.html',
		controller: 'userController',
		resolve: {
			authorize: function(authService){
				return authService.authorize();
			}
		}
	})
	.state('thing', {
		url: '/thing',
		templateUrl: 'html/thing.html',
		controller: 'thingController',
		resolve: {
			authorize: function(authService){
				return authService.authorize();
			}
		}
	})
	.state('login', {
		url: '/login',
		templateUrl: '/html/loginregister.html',
		controller: 'loginRegisterController' 
	})
	.state('register', {
		url: '/register',
		templateUrl: '/html/loginregister.html',
		controller: 'loginRegisterController' 
	})

	$urlRouterProvider.otherwise('/home');

});

