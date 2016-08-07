"use strict";

app.controller("TestingCtrl", function($scope) {


$scope.hundredthSecond = 0;

$scope.second = 0;

$scope.minute = 0;



let timer = setInterval(function() {
 $scope.hundredthSecond++
 $scope.$apply();

 if ($scope.hundredthSecond%100 === 0) {
  if($scope.second === 59) {
    $scope.second = 0;
    $scope.minute++;
    $scope.$apply();
  } else {
      $scope.second++
      $scope.$apply();
    }
 }

 console.log($scope.hundredthSecond)
}, 10)






// let bardata = [20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80, 20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80, 20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80, 20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80, 20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80];


// var height = 200,
//     width = 720,
//     barWidth = 40,
//     barOffset = 20;

// var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.05);
 
// var yScale = d3.scaleLinear()
//         .domain([0, d3.max(bardata)])
//         .range([0, height]);

// var xScale = d3.scaleBand()
//         .domain(d3.range(0, bardata.length))
//         .range(d3.range(0, width))
//         .paddingInner([.2])

// let color1 = '#2ead16';
// let color2 = '#C61C6F';

// var colors = d3.scaleLinear()
//         .domain([d3.min(bardata), d3.max(bardata)])
//         .range([`${color1}`, `${color2}`]);

// var colors2 = d3.scaleLinear()
//         .domain([d3.min(bardata), d3.max(bardata)])
//         .range(['#FFFFFF', '#FFB832']); 

// $scope.colorTest = ""      

// $scope.testButton = function () {
//   console.log("buttonpressed");
//   // d3.select('#test-chart').style('background', '#FFFFFF')
//   // d3.selectAll('elementsyouwanttochange').data().enter().style(newcolors)

//   // this works
//   // d3.select('svg').style('background', '#FFFFFF')

//   d3.selectAll('rect').style('fill', colors2)
// }



//  $scope.$watch('colorTest', function(newVal, oldVal) {
//         if (!newVal) {return};

//         // color1 = newVal;

//         let colors3 = d3.scaleLinear()
//         .domain([d3.min(bardata), d3.max(bardata)])
//         .range([`${newVal}`, `${color2}`]); 

//         // colors;

//         d3.selectAll('rect').style('fill', colors3)

//     //     color1 = $scope.color;
//     //     d3.selectAll('rect').data(trackAnalysis.bars).enter().style('fill', function(data) {
//     //     return colors(barsDurationFn(data));
//     // });
// });


//  $scope.$watch('colorTest2', function(newVal, oldVal) {
//         if (!newVal) {return};

//         color2 = newVal;

//         let colors3 = d3.scaleLinear()
//         .domain([d3.min(bardata), d3.max(bardata)])
//         .range([`${color1}`, `${newVal}`]); 

//         colors;

//         d3.selectAll('rect').style('fill', colors3)

//     //     color1 = $scope.color;
//     //     d3.selectAll('rect').data(trackAnalysis.bars).enter().style('fill', function(data) {
//     //     return colors(barsDurationFn(data));
//     // });
// });


//   $scope.$watch('colorTest3', function(newVal, oldVal) {
//         if (!newVal) {return};

//         d3.select('svg').style('background', `${newVal}`)

//     //     color1 = $scope.color;
//     //     d3.selectAll('rect').data(trackAnalysis.bars).enter().style('fill', function(data) {
//     //     return colors(barsDurationFn(data));
//     // });
// });



// d3.select('#test-chart').append('svg')
//   .attr('width', width)
//   .attr('height', height)
//   .style('background', '#dff0d8')
//   .selectAll('rect').data(bardata)
//   .enter().append('rect')
//     .style('fill', colors)
//     .attr("width", function() {
//       console.log("xScale.bandwidth", xScale.bandwidth()*width)
//       return xScale.bandwidth()*width
//     })
//     .attr('height', function (data) {
//         return yScale(data);
//     })
//       .attr('x', function (data, i) {
//         console.log("xScale(i)", xScale(i));
//         return xScale(i)*width;
//     })
//     .attr('y', function (data) {
//         // console.log("yScale(i)", height-yScale(data));
//         return height - yScale(data);
//     });

});