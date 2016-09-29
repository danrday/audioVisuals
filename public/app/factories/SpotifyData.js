"use strict";

app.factory("SpotifyData", function(FirebaseURL, $q, $http) {

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
          console.log("returnedAnalysisData", returnedAnalysisData)
         },
         error: function(err) {
          alert("Error... did you login with Spotify?");
          // alert(err)
          reject(err)
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
