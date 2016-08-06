"use strict";

app.controller("ColorPicker3", function($scope) {


$scope.$watch('updateColor3', function(newVal, oldVal) {
        if (!newVal) {return};

    console.log("newVal", newVal);

    $scope.updateColor3 = newVal;

    console.log("$scope.updateColor from colorpicker3", $scope.updateColor3)

});


});