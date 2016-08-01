"use strict";

var app = angular.module("AudioVis", ['spotify', 'ui.router']);
// .constant('FirebaseURL', "https://pinkey-brain.firebaseio.com");

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when('/', '/nav');

  // Now set up the states
  $stateProvider
    .state('home', {
      url: "",
      abstract: true,
      template: '<ui-view/>'
    })
     .state('home.nav', {
      url: "/nav",
      templateUrl: "app/partials/nav.html",
      controller: 'NavCtrl'
    })
     .state('home.nav.level3', {
      url: "/level3",
      templateUrl: 'app/partials/uiTest.html',
      controller: 'dataCtrl'
    });

// For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  
    });


//apparently this code console logs out any ui-provider errors that would not display by default
app.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});

