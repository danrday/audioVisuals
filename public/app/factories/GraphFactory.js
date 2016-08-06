"use strict";

app.factory("GraphStorage", function(FirebaseURL, $q, $http) {

  let putTrack = function(fbTrackId, newTrackObj) {
    return $q(function(resolve, reject) {
      $http.patch(
        `${FirebaseURL}/graph/${fbTrackId}.json`,
          JSON.stringify(newTrackObj)   
      )
      .success(function(message) {
        resolve(message);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  let postNewGraph = function (newGraph, trackId) {
    return $q(function(resolve, reject) {
      $http.post(
        `${FirebaseURL}/graph.json`,
        JSON.stringify(newGraph)
      )
      .success(function(ObjFromFirebase) {
        resolve(ObjFromFirebase);
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  let postJSONData = function (trackJSON) {
       return $q(function(resolve, reject) {
      $http.post(
        `${FirebaseURL}/trackJSON.json`,
        // trackJSON;
        JSON.stringify(trackJSON)
      )
      .success(function(ObjFromFirebase) {
        resolve(ObjFromFirebase);
      })
      .error(function(error) {
        reject(error);
      });
    });
  }

  return {
    postNewGraph, postJSONData, putTrack
  };

});