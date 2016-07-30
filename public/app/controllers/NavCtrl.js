"use strict";

app.controller("NavCtrl", function($http, $scope, $rootScope, Spotify) {

let authToken = null;

//contains 20 track results matching search criteria
$scope.searchResults = {};

//contains basic track information
$scope.trackAudioFeatures = {};

//contains detailed track information
$scope.trackAnalysis = {};

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
  })
};

$scope.goToTrack = function(id) {
  $.ajax({
  method:'GET',
  url: `http://api.spotify.com/v1/audio-features/${id}?access_token=${authToken}`,
  success: function(basicTrackData) {
    console.log(basicTrackData);
    $scope.trackAudioFeatures = basicTrackData;
  },
  error: function() {
         alert("Error... did you login?")
      }
  }).then(function(returnedData) {
    let analysisUrl = returnedData.analysis_url;
    $.ajax({
      method:'GET',
      url: `${analysisUrl}?access_token=${authToken}`,
       success: function(returnedAnalysisData) {
         console.log(returnedAnalysisData);
           $scope.trackAnalysis = returnedAnalysisData;
        },
        error: function() {
         alert("Error... did you login with Spotify?")
        }
     })
   });
};


});