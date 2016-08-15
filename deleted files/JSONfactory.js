"use strict";

app.factory("JSONfactory", function(FirebaseURL, $q, $http) {

  let jsonData = [];

  let getJSON = function (id) {
    let jsonData = [];
    return $q(function(resolve, reject) {
      $http.get(`${FirebaseURL}/trackJSON.json?orderBy="trackId"&equalTo='59LpUSCUapeBiavQzFsiCM'`)
      .success(function(jsonObject){

        console.log("returnedJSON", jsonObject)
        // if (jsonObject) {
        //   // Object.keys(tracksObject).forEach(function(key) {
        //   //   tracksObject[key].id = key;
        //     jsonData.push(jsonObject[0]);
        //   // });
        // }
        resolve(jsonObject);
        })
        .error(function(error){
          reject(error);
      });
    });
  };

  return {
    getJSON, jsonData
  };

});