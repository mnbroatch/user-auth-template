"use strict;"

angular.module('user-auth')
.service('thingService', function($http){


	this.getAll = () => {
		return $http({
			method:'GET',
			url: '/api/things'
		})
		.then( res => {
			if (res.data.length)
				return res.data;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.getAllOfUser = (userId) => {
		return $http({
			method:'GET',
			url: '/api/things/' + userId
		})
		.then( res => {
			if (res.data)
				return res.data.things;
		})
		.catch(err => {
			console.log('err: ', err);
		});
	}

	this.addOne = (thing,user) => {
		return $http({
			method:'POST',
			url: '/api/things',
			data: {thing:thing, user:user}
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}

	this.removeOne = (thing) => {
		return $http({
			method:'DELETE',
			url: '/api/things/' + thing._id
		});
	}

	this.editOne = (thing) => {
		return $http({
			method:'PUT',
			url: '/api/things/' + thing._id,
			data: thing
		})
		.then( res => {
			if (res.data){
				return res.data;
			}
		})
		.catch(err => {console.log('err: ', err)});
	}


});

