"use strict";

app.controller("TracksCtrl", function($scope, AuthFactory, TrackStorage, SpotifyFactory) {

$scope.deleteTrack = function(trackID) {
  TrackStorage.deleteTrack(trackID)
  .then(function() {
    TrackStorage.getTracks(AuthFactory.getUser())
  .then( function (trackCollection) {
  $scope.trackResults = trackCollection;
  console.log("tracks", $scope.trackResults);
   });
  });
}

//  $scope.goToSavedTrack = function(trackId) {
//   console.log("track id from tracksCtrl", trackId)
//   SpotifyFactory.getSpotifyData(trackId)
//   .then(function(resolve) {
//     console.log("data", resolve)
//   })
// }

$scope.goToSavedTrack = function(trackId) {
  SpotifyFactory.trackId = trackId
  console.log("tracks ctrl spotify track id", SpotifyFactory.trackId)
}

$scope.getTrack = function(trackID) {
  console.log("trackID", trackID)
}

$scope.trackResults = [];

firebase.auth().onAuthStateChanged(function(){
 TrackStorage.getTracks(AuthFactory.getUser())
  .then( function (trackCollection) {
  $scope.trackResults = trackCollection;
  console.log("tracks", $scope.trackResults);
  });
});

 
  // console.log("tracks", $scope.tracks);

  // $scope.delete = function (id) {
  //   BoardStorage.deleteBoard(id)
  //   .then(function() {
  //     console.log("deleted");
  //     BoardStorage.getBoards(AuthFactory.getUser())
  //     .then(function(boardCollection) {
  //       console.log("board collection", boardCollection);
  //       $scope.boards = boardCollection;
  //     });
  //   });
  // };

});