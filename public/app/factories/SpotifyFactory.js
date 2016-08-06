"use strict";

app.factory("SpotifyFactory", function(FirebaseURL, $q, $http) {

let trackId = null;

let trackAudioFeatures = null;

//contains detailed track information
let trackAnalysis = null;

//contains discography information
let trackDiscog = null;

let songGeneralInfo = {};

let authToken = null;

$.ajax({
  method: 'GET',
  url: 'http://localhost:8888/getToken',
  success: function(returnedToken) {
    console.log(returnedToken);
    authToken = returnedToken;
  }
});

let trackSpecs = null;


let getSpotifyData = function(id) {

  return $q(function(resolve, reject) {

  $.ajax({
  method:'GET',
  url: `http://api.spotify.com/v1/audio-features/${id}?access_token=${authToken}`,
  success: function(basicTrackData) {
    console.log(basicTrackData);
    trackAudioFeatures = basicTrackData;
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
           trackAnalysis = JSON.parse(returnedAnalysisData);
          console.log(trackAnalysis);
        },
        error: function() {
         alert("Error... did you login with Spotify?");
        }
     }).then(function() {
       $.ajax({
    method: 'GET',
    url: `${trackSpecs}`,
    success: function(returnedData) {
      trackDiscog = returnedData;
      console.log("trackDiscog", trackDiscog);
      let discog = trackDiscog;
      songGeneralInfo = {
        artist: discog.artists[0].name,
        song: discog.name,
        album: discog.album.name
    };
    resolve(returnedData)
    },
    error: function(error) {
      reject(error)
    }
  })
     })

   });

})

}




  return {
    getSpotifyData, trackAudioFeatures, trackAnalysis, trackDiscog, songGeneralInfo, trackSpecs, trackId
  };

});





