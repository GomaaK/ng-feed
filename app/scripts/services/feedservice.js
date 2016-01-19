'use strict';

/**
 * @ngdoc service
 * @name infscrollApp.FeedService
 * @description
 * # FeedService
 * Service in the infscrollApp.
 */
angular.module('infscrollApp').service('FeedService', function ($q, $http) {
	var mv = this
	mv.pages = {};
	mv.next_offset_id = null;
	mv.users = {}; 

	mv.getUser = function(userId) {
		return mv.users[userId];
	};

	mv.getFeed = function(page) {
		if(page in mv.pages) {
			// $q.defer is used to keep the API consistent -> Returns a promise which resolves to the requested page
			var deferred = $q.defer();
			deferred.resolve(mv.pages[page]);
			console.log('hellow');
			return deferred.promise;
		} else {
			var url = 'http://localhost:3000/?user_id=1&offset=' + page*10;
			if(mv.next_offset_id){
				url = url + '&offset_id='+ mv.next_offset_id;
			}
			var promise = $http.get(url);
			console.log('hellow');
			promise = promise.then(function(response) {
				// add users to cached users
				var users = angular.fromJson(response.data.users);
				for(var userId in users) {
					mv.users[userId] = users[userId];
				}
				console.log(mv.users);
				// add posts page to cached pages
				console.log(response.data);
				var posts = angular.fromJson(response.data.posts);
				mv.pages[page] = []
				posts.forEach(function(p) {
					var post = angular.fromJson(p)
					post.user = mv.getUser(post.user_id)
					mv.pages[page].push(post)
				});
				var current_page = mv.pages[page]
				mv.next_offset_id = current_page[current_page.length-1].id
				console.log(mv.pages[page]);
				

				return mv.pages[page];
			});
			return promise;
		}
	};
});
