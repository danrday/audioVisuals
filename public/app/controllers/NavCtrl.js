"use strict";

app.controller("NavCtrl", function($http, $scope, $rootScope, $location, Spotify, AuthFactory) {

let authToken = null;

// BEGINNING LOGIN STUFF

  $scope.googleLogin = function() {
    AuthFactory.authWithProvider()
   .then(function(result) {
     var user = result.user.uid;
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

  // logout function
  $scope.logout = function() {
    AuthFactory.signOut();
  }


//END  LOGIN STUFF

//contains 20 track results matching search criteria
$scope.searchResults = {};

//contains basic track information
$scope.trackAudioFeatures = {};

//contains detailed track information
$scope.trackAnalysis = null;

//contains discography information
$scope.trackDiscog = null;

$scope.songGeneralInfo = {};

$scope.clearSearch = function () {
  $scope.searchResults = {};
}

//search for tracks by search criteria 
$scope.searchAlbums = function(query) {
    Spotify.search(query, 'track').then(function (data) {
    $scope.searchResults = data.tracks.items;
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

$scope.goToTrack = function(id) {

  $.ajax({
  method:'GET',
  url: `http://api.spotify.com/v1/audio-features/${id}?access_token=${authToken}`,
  success: function(basicTrackData) {
    console.log(basicTrackData);
    $scope.trackAudioFeatures = basicTrackData;
    $scope.$apply();
  },
  error: function() {
         alert("Error... did you login?");
      }
  }).then(function(returnedData) {
    let analysisUrl = returnedData.analysis_url;
    let trackSpecs = returnedData.track_href;
    $.ajax({
      method:'GET',
      url: `${analysisUrl}?access_token=${authToken}`,
       success: function(returnedAnalysisData) {
           $scope.trackAnalysis = JSON.parse(returnedAnalysisData);
           $scope.$apply();
          console.log($scope.trackAnalysis);
        },
        error: function() {
         alert("Error... did you login with Spotify?");
        }
     });

    $.ajax({
    method: 'GET',
    url: `${trackSpecs}`,
    success: function(returnedData) {
      $scope.trackDiscog = returnedData;
      console.log("trackDiscog", $scope.trackDiscog);
      let discog = $scope.trackDiscog;
      $scope.songGeneralInfo = {
        artist: discog.artists[0].name,
        song: discog.name,
        album: discog.album.name
    };
    }
  })



   });

  

};


});