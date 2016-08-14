"use strict";

app.controller("NavCtrl", function($http, $scope, $rootScope, $state, $location, Spotify, AuthFactory, localStorageService, TrackStorage, SpotifyData ) {

  $scope.customColors = null;

  // mytracks STUFF

  $scope.deleteTrack = function(trackID) {
    TrackStorage.deleteTrack(trackID)
    .then(function() {
      TrackStorage.getTracks(AuthFactory.getUser())
    .then( function (trackCollection) {
    $scope.myTrackResults = trackCollection;
    console.log("tracks", $scope.trackResults);
     });
    });
  }

  $scope.clearMyTracks = function () {
   $scope.myTrackResults = {};
  }

  $scope.myTrackResults = [];

  $scope.getMyTracks = function () {
    $scope.clearSearch();

    TrackStorage.getTracks(AuthFactory.getUser())
    .then( function (trackCollection) {
      $scope.myTrackResults = trackCollection;
      console.log("my track results", $scope.myTrackResults);
    });
  }

  // BEGINNING LOGIN STUFF

  $scope.notLoggedIn = true; 

  firebase.auth().onAuthStateChanged(function(){
    let user = AuthFactory.getUser();
    console.log("STATE CHANGE", user);
    if (user !== null) {
    $scope.notLoggedIn = false;
    $scope.$apply();
    console.log("AAAuser", AuthFactory.getUser())
    }
  });

  $scope.googleLogin = function() {
    AuthFactory.authWithProvider()
   .then(function(result) {
     AuthFactory.setUser(result.user.uid);
     console.log("logged in user fer sure", user);
     // Load to dos?
     // $location.path("/boards");
     // $scope.$apply();
   }).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
     // The email of the user's account used.
     var email = error.email;
     // The firebase.auth.AuthCredential type that was used.
     var credential = error.credential;
     // ...
   });  
  };

  $scope.googleLogout = function() {
    AuthFactory.signOut();
    $scope.notLoggedIn = true;
  }

  //END  LOGIN STUFF

  let authToken = null;

  //contains 20 track results matching search criteria
  $scope.searchResults = {};

  //contains basic track information
  $scope.trackAudioFeatures = {};

  //contains detailed track information
  $scope.trackAnalysis = null;

  //contains discography information
  $scope.trackDiscog = null;

  $scope.songGeneralInfo = {};

  $scope.savedColors = {};

  //if true, chartCtrl will load last saved colors
  $scope.isLoadingSavedTrack = false;

  $scope.clearSearch = function () {
    $scope.searchResults = {};
  }

  //search for tracks by search criteria 
  $scope.searchAlbums = function(query) {

    // clears myTracks if open
    $scope.clearMyTracks();

    Spotify.search(query, 'track').then(function (data) {
      $scope.searchResults = data.tracks.items;
      console.log($scope.searchResults)
    });

    //gets user token when user searches
    $.ajax({
      method: 'GET',
      url: 'http://localhost:8888/getToken',
      success: function(returnedToken) {
        console.log(returnedToken);
        authToken = returnedToken;
      }
    });
  };

  $scope.goToTrack = function(id, imageId) {
  $scope.trackImage = imageId;
  $scope.isLoadingSavedTrack = false;
  $scope.clearSearch();
  $state.go('home.nav.loading')
  SpotifyData.getInitialData(id, authToken)
  .then(function(basicTrackData) {
     console.log(basicTrackData);
      $scope.trackAudioFeatures = basicTrackData;
      let analysisUrl = basicTrackData.analysis_url;
      let discogUrl = basicTrackData.track_href;
      getDetailedAnalysis(analysisUrl, authToken);
      getTrackDiscog(discogUrl);
   }).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
   }); 
  }

  $scope.fbId = null;

  $scope.goToSavedTrack = function(id, fbid, color1, color2, color3) {
  $scope.clearSearch();
  $state.go('home.nav.loading')
  $scope.fbId = fbid;
  $scope.isLoadingSavedTrack = true;
  $scope.savedColors.color1 = color1;
  $scope.savedColors.color2 = color2;
  $scope.savedColors.color3 = color3;
  console.log("$scope.savedColors", $scope.savedColors)
  SpotifyData.getInitialData(id, authToken)
  .then(function(basicTrackData) {
     console.log(basicTrackData);
      $scope.trackAudioFeatures = basicTrackData;
      let analysisUrl = basicTrackData.analysis_url;
      let discogUrl = basicTrackData.track_href;
      getDetailedAnalysis(analysisUrl, authToken);
      getTrackDiscog(discogUrl);
   }).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
   }); 
  }


  let getDetailedAnalysis = function (analysisUrl, authToken) {
    SpotifyData.getTrackAnalysis(analysisUrl, authToken)
    .then(function(returnedAnalysisData) {
     $scope.trackAnalysis = JSON.parse(returnedAnalysisData);
            console.log($scope.trackAnalysis);
      $state.go('home.nav.chart3')
   }).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
   }); 
  }

  let getTrackDiscog = function (discogUrl) {
    SpotifyData.getTrackDiscog(discogUrl)
    .then(function(returnedDiscogData) {
    $scope.trackDiscog = returnedDiscogData;
          console.log("trackDiscog", $scope.trackDiscog);
          let discog = $scope.trackDiscog;
          $scope.songGeneralInfo = {
            artist: discog.artists[0].name,
            song: discog.name,
            album: discog.album.name
        };
   }).catch(function(error) {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
   }); 
  }

});