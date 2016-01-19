'use strict';

/**
 * @ngdoc function
 * @name infscrollApp.controller:FeedCtrl
 * @description
 * # FeedCtrl
 * Controller of the infscrollApp
 */
angular.module('infscrollApp').controller('FeedCtrl', function ($scope, FeedService) {
	$scope.page = 1;
	$scope.posts = [];
	$scope.getFeed = function() {
		if($scope.page > 1){
			var offset_id = $scope.posts[$scope.posts.length-1].id;
		}
		FeedService.getFeed($scope.page++, offset_id).then(function(data) {
			data.forEach(function(post) {
				$scope.posts.push(post);
			});
		});
	};

	$scope.getUser = function(userId) {
		return FeedService.getUser(userId);
	};
});
