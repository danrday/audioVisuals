"use strict";

app.factory("SpotifyData", function(FirebaseURL, $q, $http) {

  // let trackId = null;

  // let trackAudioFeatures = null;

  // //contains detailed track information
  // let trackAnalysis = null;

  // //contains discography information
  // let trackDiscog = null;

  // let songGeneralInfo = {};

  // let authToken = null;
  //   $.ajax({
  //     method: 'GET',
  //     url: 'http://localhost:8888/getToken',
  //     success: function(returnedToken) {
  //       console.log(returnedToken);
  //       authToken = returnedToken;
  //     }
  //   });

  //   let trackSpecs = null;

  let getInitialData = function(id, authToken) {

    return $q(function(resolve, reject) {

      $.ajax({
        method:'GET',
        url: `http://api.spotify.com/v1/audio-features/${id}?access_token=${authToken}`,
        success: function(basicTrackData) {
          resolve(basicTrackData)
        },
        error: function() {
         alert("Error... did you login?");
         reject(error)
        }
      })
    })
  }

  let getTrackAnalysis = function(analysisUrl, authToken) {

    return $q(function(resolve, reject) {

      $.ajax({
        method:'GET',
        url: `${analysisUrl}?access_token=${authToken}`,
         success: function(returnedAnalysisData) {  
          resolve(returnedAnalysisData)
         },
         error: function() {
          alert("Error... did you login with Spotify?");
          reject(error)
         }
      })
    })
  }

  let getTrackDiscog = function(trackSpecs) {

    return $q(function(resolve, reject) {

      $.ajax({
        method: 'GET',
        url: `${trackSpecs}`,
        success: function(returnedDiscogData) {  
          resolve(returnedDiscogData)
        },
        error: function(error) {
          reject(error)
        }
      })   
    })
  }

  return {
    getInitialData, getTrackAnalysis, getTrackDiscog
  };
});

