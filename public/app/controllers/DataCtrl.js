"use strict";

app.controller("DataCtrl", function($scope) {

// var chartdata = $scope.trackAnalysis.bars;

let trackAnalysis = JSON.parse($scope.trackAnalysis);

console.log("trackAnalysis", trackAnalysis.bars.length);


// var height = 200,
//     width = 720,
//     barWidth = 40,
//     barOffset = 20;

// var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.05);
 
// var yScale = d3.scaleLinear()
//         .domain([0, d3.max(chartdata)])
//         .range([0, height]);

// var xScale = d3.scaleLinear()
//         .domain([0, chartdata.length])
//         .range([0, width]);

 
// d3.select('#bar-chart').append('svg')
//   .attr('width', width)
//   .attr('height', height)
//   .style('background', '#dff0d8')
//   .selectAll('rect').data(chartdata)
//   .enter().append('rect')
//     .style('fill', '#3c763d')
//     .attr("width", 1)
//     .attr('height', function (data) {
//         return yScale(data);
//     })
//       .attr('x', function (data, i) {
//         console.log("xScale(i)", xScale(i));
//         return xScale(i);
//     })
//     .attr('y', function (data) {
//         console.log("yScale(i)", height-yScale(data));
//         return height - yScale(data);
//     });


});


// var bardata = [20, 30, 105, 15, 85, 20, 30, 105, 15, 85, 20, 30, 105, 15, 85, 20, 30, 105, 15, 85];

// var height = 400,
//     width = 600,
//     barWidth = 50,
//     barOffset = 5;


// d3.select('#chart').append('svg')
//     .attr('width', width)
//     .attr('height', height)
//     .style('background', '#C9D7D6')
//     .selectAll('rect').data(bardata)
//     .enter().append('rect')
//         .style('fill', '#C61C6F')
//         .attr('width', barWidth)
//         .attr('height', function(d) {
//             return d;
//         })
//         .attr('x', function(d,i) {
//             return i * (barWidth + barOffset);
//         })
//         .attr('y', function(d) {
//             return height - d;
//         })


/////////////////////////

// let bardata = [20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80];

// let height = 400,
//     width = 600,
//     barWidth = 50,
//     barOffset = 5;

// let yScale = d3.scale.linear()
//         .domain([0, d3.max(bardata)])
//         .range([0, height]);

// let xScale = d3.scale.ordinal()
//         .domain(d3.range(0, bardata.length))
//         .rangeBands([0, width])

// d3.select('#chart').append('svg')
//     .attr('width', width)
//     .attr('height', height)
//     .style('background', '#C9D7D6')
//     .selectAll('rect').data(bardata)
//     .enter().append('rect')
//         .style('fill', '#C61C6F')
//         .attr('width', xScale.rangeBand())
//         .attr('height', function(d) {
//             return yScale(d);
//         })
//         .attr('x', function(d,i) {
//             return xScale(i);
//         })
//         .attr('y', function(d) {
//             return height - yScale(d);
//         })