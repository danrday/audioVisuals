"use strict";

app.controller("ColorPicker2", function($scope) {


$scope.$watch('updateColor2', function(newVal, oldVal) {
        if (!newVal) {return};

    console.log("newVal", newVal);

    $scope.updateColor2 = newVal;

    console.log("$scope.updateColor from colorpicker2", $scope.updateColor2)

});


});