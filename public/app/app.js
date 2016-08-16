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
     .state('home.nav.trackTempoCharts', {
      url: "/trackTempoCharts",
      views: {
            // the main template will be placed here (relatively named)
            '': { templateUrl: 'app/partials/trackTempoCharts.html', controller: 'TrackTempoChartsCtrl' },
            // embedded charts
            'beatsDuration@home.nav.trackTempoCharts': { 
                templateUrl: 'app/partials/beatsDuration.html',
                controller: 'BeatsDurationCtrl'
            },
            'barsDuration@home.nav.trackTempoCharts': { 
                templateUrl: 'app/partials/barsDuration.html',
                controller: 'BarsDurationCtrl'
            },
            'barsConfidence@home.nav.trackTempoCharts': { 
                templateUrl: 'app/partials/barsConfidence.html',
                controller: 'BarsConfidenceCtrl'
            },
            'beatsConfidence@home.nav.trackTempoCharts': { 
                templateUrl: 'app/partials/beatsConfidence.html',
                controller: 'BeatsConfidenceCtrl'
            },
            'sectionsConfidence@home.nav.trackTempoCharts': { 
                templateUrl: 'app/partials/sectionsConfidence.html',
                controller: 'SectionsConfidenceCtrl'
            },
            'sectionsTempo@home.nav.trackTempoCharts': { 
                templateUrl: 'app/partials/sectionsTempo.html',
                controller: 'SectionsTempoCtrl'
            }
        }
    })
     // low range color-picker
     .state('home.nav.trackTempoCharts.colorpicker1', {
      url: "/colorpicker1",
      templateUrl: 'app/partials/colorpicker/trackTempoCharts.colorPicker1.html',
    })
     // high range color-picker
     .state('home.nav.trackTempoCharts.colorpicker2', {
      url: "/colorpicker2",
      templateUrl: 'app/partials/colorpicker/trackTempoCharts.colorpicker2.html',
    })
     // background color-picker
     .state('home.nav.trackTempoCharts.colorpicker3', {
      url: "/colorpicker3",
      templateUrl: 'app/partials/colorpicker/trackTempoCharts.colorpicker3.html',
    })
     .state('home.nav.loading', {
      url: "/loading",
      templateUrl: 'app/partials/loading.html'
    });

// For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");  
    });

//this code console logs out any ui-provider errors that would not display by default
app.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});