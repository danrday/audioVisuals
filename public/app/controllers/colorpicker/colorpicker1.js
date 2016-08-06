"use strict";

app.controller("ColorPicker1", function($scope) {


$scope.newnew = {
    update1: "trest",
    update2: "",
    update3: ""
  }


$scope.$watch('newnew.update1', function(newVal, oldVal) {
        if (!newVal) {return};

    console.log("newVal", newVal);

    // $scope.newnew.update1 = newVal;

    console.log("$scope.updateColor1 from colorpicker1", $scope.newnew.update1)
});




console.log("$scope.updateColor1", $scope.updateColor1);

});