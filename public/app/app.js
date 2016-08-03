"use strict";

var app = angular.module("AudioVis", ['spotify', 'ui.router', 'mp.colorPicker', 'LocalStorageModule'])
.constant('FirebaseURL', "https://audiovisuals-85fa6.firebaseio.com");

app.config(function($stateProvider, $urlRouterProvider, FBCreds) {

  let authConfig = {
    apiKey: FBCreds.apiKey,
    authDomain: FBCreds.authDomain,
    databaseURL: FBCreds.databaseURL,
    storageBucket: FBCreds.storageBucket
  };

  firebase.initializeApp(authConfig);
  

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
     .state('home.nav.data', {
      url: "/data",
      templateUrl: 'app/partials/data.html',
      controller: 'DataCtrl'
    })
     .state('home.nav.testChart', {
      url: "/test",
      templateUrl: 'app/partials/testChart.html',
      controller: 'TestingCtrl'
    });

// For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  
    });


//apparently this code console logs out any ui-provider errors that would not display by default
app.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});

