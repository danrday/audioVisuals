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
     .state('home.nav.chart2', {
      url: "/chart2",
      templateUrl: 'app/partials/chart2.html',
      controller: 'Chart2Ctrl'
    })
     .state('home.nav.chart2.colorpicker1', {
      url: "/colorpicker1",
      templateUrl: 'app/partials/colorpicker/chart2.colorpicker1.html',
      // controller: 'ColorPicker1'
    })
     .state('home.nav.chart2.colorpicker2', {
      url: "/colorpicker2",
      templateUrl: 'app/partials/colorpicker/chart2.colorpicker2.html',
      // controller: 'ColorPicker2'
    })
     .state('home.nav.chart2.colorpicker3', {
      url: "/colorpicker3",
      templateUrl: 'app/partials/colorpicker/chart2.colorpicker3.html',
      // controller: 'ColorPicker3'
    })
     .state('home.nav.chart3', {
      url: "/chart3",
      templateUrl: 'app/partials/chart3.html',
      controller: 'Chart3Ctrl'
    })
     .state('home.nav.chart3.colorpicker1', {
      url: "/colorpicker1",
      templateUrl: 'app/partials/colorpicker/chart2.colorpicker1.html',
      // controller: 'ColorPicker1'
    })
     .state('home.nav.chart3.colorpicker2', {
      url: "/colorpicker2",
      templateUrl: 'app/partials/colorpicker/chart2.colorpicker2.html',
      // controller: 'ColorPicker2'
    })
     .state('home.nav.chart3.colorpicker3', {
      url: "/colorpicker3",
      templateUrl: 'app/partials/colorpicker/chart2.colorpicker3.html',
      // controller: 'ColorPicker3'
    })
     .state('home.nav.data', {
      url: "/data",
      templateUrl: 'app/partials/data.html',
      controller: 'DataCtrl'
    })
     .state('home.nav.mytracks', {
      url: "/mytracks",
      templateUrl: 'app/partials/myTracks.html',
      controller: 'TracksCtrl'
    })
     .state('home.nav.savedtrack', {
      url: "/savedtrack",
      templateUrl: 'app/partials/savedTrack.html',
      controller: 'SavedTrackCtrl'
    })
     .state('home.nav.testChart', {
      url: "/test",
      templateUrl: 'app/partials/testChart.html',
      controller: 'TestingCtrl'
    })
     .state('home.nav.loading', {
      url: "/loading",
      templateUrl: 'app/partials/loading.html'
      // controller: 'LoadingCtrl'
    });

// For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");  
    });

//apparently this code console logs out any ui-provider errors that would not display by default
app.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});