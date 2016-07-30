"use strict";

var app = angular.module("AudioVis", ['spotify', 'ui.router']);
// .constant('FirebaseURL', "https://pinkey-brain.firebaseio.com");

app.config(function($stateProvider, $urlRouterProvider) {

  // Now set up the states
  $stateProvider
    .state('view1', {
      url: "/",
      templateUrl: "app/partials/nav.html",
      controller: 'NavCtrl'
    })
    .state('view2', {
      url: "/view2",
      templateUrl: "app/partials/indexPartial.html"
    })
    .state('view3', {
      url: "/view3",
      templateUrl: "app/partials/uiTest.html"
    });

// For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");


    });

//apparently this code console logs out any ui-provider errors that would not display by default
app.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});

