"use strict";

app.controller("NavCtrl", function($http, $scope, $rootScope, $location, Spotify, AuthFactory, localStorageService, TrackStorage) {


  $scope.customColors = null;

$scope.loader = "";


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
  $scope.loader = "loading..."


     TrackStorage.getTracks(AuthFactory.getUser())
  .then( function (trackCollection) {
    $scope.myTrackResults = trackCollection;
    console.log("my track results", $scope.myTrackResults);
  });

}


// my tracks stuff



// BEGINNING LOGIN STUFF

$scope.notLoggedIn = true; 

// let currentUser = localStorageService.get("currentUser");
// console.log("localstorageserviceget user",currentUser)

let refreshItems = function() {
  // ItemStorage.getItemList()
  // .then(function(itemCollection) {
  //   $scope.items = itemCollection;
  // });
  
  
  
}

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

  // logout function
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

$scope.fbId = null;

$scope.goToTrack = function(id, fbId, customColor1, customColor2, customColor3) {

if (customColor1) {

  console.log("CUSTOMCOLOR1 NOT UNDEDINED")
  // $scope.customColors = {
  //   customColor1: customColor1,
  //   customColor2: customColor2,
  //   customColor3: customColor3
  // }
}




$scope.fbId = fbId;
console.log("fbId", fbId)

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
          $scope.loader = "Display Track Data"
          $scope.$apply();
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