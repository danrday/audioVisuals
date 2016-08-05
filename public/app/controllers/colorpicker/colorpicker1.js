"use strict";

app.controller("ColorPicker1", function($scope) {




$scope.$watch('updateColor1', function(newVal, oldVal) {
        if (!newVal) {return};

    console.log("newVal", newVal);

    $scope.updateColor1 = newVal;

    console.log("$scope.updateColor1 from colorpicker1", $scope.updateColor1)

});


console.log("$scope.updateColor1", $scope.updateColor1);

});