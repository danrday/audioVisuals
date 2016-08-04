"use strict";

app.controller("NewGraphCtrl", function($scope, $routeParams, GraphStorage, $location) {

  $scope.newGraph = {
    graphType: "",
    color1: "",
    color2: "",
    color3: ""
  }

  $scope.addNewGraph = function() {
    GraphStorage.postNewGraph($scope.newGraph, boardId)
    .then(function() {
      console.log("success")
      // $location.url("/boards");
    })
  };

});