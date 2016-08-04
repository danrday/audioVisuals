"use strict";

app.factory("GraphStorage", function(FirebaseURL, $q, $http) {

  // let getPins = function () {
  //   let pins = [];
  //   return $q(function(resolve, reject) {
  //     $http.get(`${FirebaseURL}/pin.json`)
  //     .success(function(pinObject){
  //       if (pinObject) {
  //         Object.keys(pinObject).forEach(function(key) {
  //           pinObject[key].id = key;
  //           pins.push(pinObject[key]);
  //         });
  //       }
  //       resolve(pins);
  //       })
  //       .error(function(error){
  //         reject(error);
  //     });
  //   });
  // };

  // let putPin = function(pinId, pinObj) {
  //   return $q(function(resolve, reject) {
  //     $http.patch(
  //       `${FirebaseURL}/pin/${pinId}.json`,
  //         JSON.stringify(pinObj)   
  //     )
  //     .success(function(message) {
  //       resolve(message);
  //     })
  //     .error(function(error) {
  //       reject(error);
  //     });
  //   });
  // };

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

  // let deletePin = function (id) {
  //   return $q(function (resolve, reject) {
  //     $http.delete(
  //       `${FirebaseURL}/pin/${id}.json`
  //       )
  //     .success(function() {
  //       resolve();
  //     })
  //     .error(function(error) {
  //       reject(error);
  //     });
  //   });
  // };

  // return {
  //   getPins, postNewPin, deletePin, putPin
  // };

  return {
    postNewGraph, postJSONData
  };

});