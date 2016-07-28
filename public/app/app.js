"use strict";

var app = angular.module("AudioVis", ['ngRoute'])
// .constant('FirebaseURL', "https://pinkey-brain.firebaseio.com");

app.config(function($routeProvider) {

  $routeProvider.
  when('/callback', {
    templateUrl: 'app/partials/testPartial.html',
    controller: 'testCtrl'
  }).
  when('/index', {
    templateUrl: 'app/partials/indexPartial.html',
    controller: 'indexCtrl'
  }).
  otherwise('/index');

});