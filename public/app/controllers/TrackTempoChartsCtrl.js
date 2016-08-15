"use strict";

app.controller("TrackTempoChartsCtrl", function($scope, $rootScope, $sce, GraphStorage, AuthFactory) {

// timer stuff

$scope.hundredthSecond = -300;

$scope.second = 0;

$scope.minute = 0;

$scope.countdown = 3;

$scope.hundredthSecCountdown = 0;

$scope.armTrack = function () {
  setInterval(function() {
 $scope.hundredthSecCountdown++
 $scope.hundredthSecond++
 $scope.$apply();

 if ($scope.hundredthSecCountdown%100 === 0) {
  if($scope.countdown === 0) {

  if($scope.second === 59) {
    $scope.second = 0;
    $scope.minute++;
    $scope.$apply();
  } else {
      $scope.second++
      $scope.$apply();
    } 

  } else {
      $scope.countdown --;
      $scope.$apply();
    }
 }
  }, 10)
}

  // toggles the color picker button on a graph
  //starts out display = false
  $scope.openColorPicker = false;

  $scope.toggleColorPicker = function () {
    $scope.openColorPicker = !$scope.openColorPicker
  };
 
  let trackId = $scope.trackAudioFeatures.id;

  let spotifyEmbed = "https://embed.spotify.com/?uri=" + $scope.trackAudioFeatures.uri; 
  $rootScope.someUrl = $sce.trustAsResourceUrl(`${spotifyEmbed}`);

  //SAVE TRACK CODE

  $scope.newGraph = {
    graphType: "barChartTrackBars",
    trackId: trackId,
    updateColor1: "#2ead16",
    updateColor2: "#C61C6F",
    updateColor3: "#dff0d8",
    trackImage: $scope.trackImage,
    song: $scope.songGeneralInfo.song,
    artist: $scope.songGeneralInfo.artist,
    album: $scope.songGeneralInfo.album
  }

  if ($scope.isLoadingSavedTrack === true) {
    $scope.newGraph.updateColor1 = $scope.savedColors.color1;
    $scope.newGraph.updateColor2 = $scope.savedColors.color2;
    $scope.newGraph.updateColor3 = $scope.savedColors.color3;
    console.log("newGraph old color bg = dff0d8, new:", $scope.newGraph);
  }

// watches for change in bg color
 $scope.$watch('newGraph.updateColor3', function(newVal, oldVal) {
        if (!newVal) {return};
        d3.selectAll('svg').style('background', `${newVal}`)
  });


  $scope.saveNewGraph = function() {

    let trackJSON = {
      trackId: trackId,
      trackAudioFeatures: $scope.trackAudioFeatures,
      trackAnalysis: $scope.trackAnalysis,
      trackDiscog: $scope.trackDiscog
    }

    console.log("trackJSON from dataCTRL", trackJSON)

    $scope.newGraph.uid = AuthFactory.getUser();

    GraphStorage.postNewGraph($scope.newGraph, trackId)
    .then(function() {
      GraphStorage.postJSONData(trackJSON)
      // $location.url("/boards");
    }).then(function() {
      console.log("success")
      // $location.url("/boards");
    })
  };


  $scope.putEditTrack = function() {
    $scope.newGraph.uid = AuthFactory.getUser();
    console.log("SCOPE ID", $scope.fbId)
      GraphStorage.putTrack($scope.fbId, $scope.newGraph)
      .then(function(message) {

        console.log(message);
        // $location.url("/boards");
      })
  };

  // JSON DATA

  let trackAnalysis = $scope.trackAnalysis;

});