"use strict";

var app = angular.module("AudioVis", ['spotify', 'ui.router'])
// .constant('FirebaseURL', "https://pinkey-brain.firebaseio.com");

app.config(function($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider
    .state('state1', {
      url: "/",
      templateUrl: "app/partials/nav.html",
      controller: 'NavCtrl'
    })
    .state('state2', {
      url: "/state2",
      templateUrl: "app/partials/indexPartial.html"
    });

// For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");


    });

app.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});

