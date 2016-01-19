'use strict';

/**
 * @ngdoc overview
 * @name infscrollApp
 * @description
 * # infscrollApp
 *
 * Main module of the application.
 */
angular
  .module('infscrollApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'infinite-scroll'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/feed.html',
        controller: 'FeedCtrl',
        controllerAs: 'feed'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
