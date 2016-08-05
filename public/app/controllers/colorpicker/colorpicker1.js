"use strict";

app.controller("ColorPicker1", function($scope) {

$scope.updateColor1 = ""



$scope.$watch('updateColor1', function(newVal, oldVal) {
        if (!newVal) {return};

    console.log("newVal", newVal);
    
});


console.log("$scope.updateColor1", $scope.updateColor1);

});