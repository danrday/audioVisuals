"use strict";

app.factory("TrackStorage", function(FirebaseURL, $q, $http) {

  let getTracks = function (userId) {
    let tracks = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/graph.json?orderBy="uid"&equalTo="${userId}"`)
      .success(function(tracksObject){
        if (tracksObject) {
          Object.keys(tracksObject).forEach(function(key) {
            tracksObject[key].id = key;
            tracks.push(tracksObject[key]);
          });
        }
        resolve(tracks);
        })
        .error(function(error){
          reject(error);
      });
    });
  };

  // let postNewBoard = function(newBoard) {
  //   return $q(function(resolve, reject) {
  //     $http.post(
  //       `${FirebaseURL}/board.json`,
  //       JSON.stringify(newBoard)
  //     )
  //     .success(function(ObjFromFirebase) {
  //       resolve(ObjFromFirebase);
  //     })
  //     .error(function(error) {
  //       reject(error);
  //     });
  //   });
  // };

  let deleteTrack = function (trackID) {
    console.log("id", trackID)
    return $q(function(resolve, reject) {
      $http.delete(
        `${FirebaseURL}/graph/${trackID}.json`
      )
      .success(function() {
        resolve();
      })
      .error(function(error) {
        reject(error);
      });
    });
  };

  // return {
  //   getBoards, postNewBoard, deleteBoard
  // };

return {
    getTracks, deleteTrack
  };


});