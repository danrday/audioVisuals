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
     .state('home.nav.chart3', {
      url: "/chart3",
      views: {
            // the main template will be placed here (relatively named)
            '': { templateUrl: 'app/partials/chart3.html', controller: 'Chart3Ctrl' },
            // embedded charts
            'beatsDuration@home.nav.chart3': { 
                templateUrl: 'app/partials/beatsDuration.html',
                controller: 'BeatsDurationCtrl'
            },
            'barsDuration@home.nav.chart3': { 
                templateUrl: 'app/partials/barsDuration.html',
                controller: 'BarsDurationCtrl'
            },
            'barsConfidence@home.nav.chart3': { 
                templateUrl: 'app/partials/barsConfidence.html',
                controller: 'BarsConfidenceCtrl'
            },
            'beatsConfidence@home.nav.chart3': { 
                templateUrl: 'app/partials/beatsConfidence.html',
                controller: 'BeatsConfidenceCtrl'
            },
            'sectionsConfidence@home.nav.chart3': { 
                templateUrl: 'app/partials/sectionsConfidence.html',
                controller: 'SectionsConfidenceCtrl'
            },
            'sectionsTempo@home.nav.chart3': { 
                templateUrl: 'app/partials/sectionsTempo.html',
                controller: 'SectionsTempoCtrl'
            }
        }
    })
     // low range color-picker
     .state('home.nav.chart3.colorpicker1', {
      url: "/colorpicker1",
      templateUrl: 'app/partials/colorpicker/chart2.colorpicker1.html',
    })
     // high range color-picker
     .state('home.nav.chart3.colorpicker2', {
      url: "/colorpicker2",
      templateUrl: 'app/partials/colorpicker/chart2.colorpicker2.html',
    })
     // background color-picker
     .state('home.nav.chart3.colorpicker3', {
      url: "/colorpicker3",
      templateUrl: 'app/partials/colorpicker/chart2.colorpicker3.html',
    })
     .state('home.nav.loading', {
      url: "/loading",
      templateUrl: 'app/partials/loading.html',
      controller: 'LoadingCtrl'
    });

// For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");  
    });

//this code console logs out any ui-provider errors that would not display by default
app.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});