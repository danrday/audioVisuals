"use strict";

app.controller("DataCtrl", function($scope) {

// var chartdata = $scope.trackAnalysis.bars;

// let trackAnalysis = JSON.parse($scope.trackAnalysis);

// console.log("trackAnalysis", trackAnalysis.bars.length);


let trackAnalysis = $scope.trackAnalysis;


//track bars OBJECT, if over 99 broken into objects of 99 or less
let trackBars = trackAnalysis.bars;

let trackBarsLength = trackBars.length;

//number of array objects within trackBars
let numOfArrays = Math.ceil(trackBars.length / 100);


console.log("trackBars", trackBars)

console.log("trackBars typeOf", typeof(trackBarsLength));

let trackBarsArray = [];

//pushes every bar's duration into a new array
for (let i = 0; i < trackBarsLength; i++) {
  let currentBarLength = trackBars[i].duration;
  trackBarsArray.push(currentBarLength);
}

console.log(trackBarsArray)


// var chartdata = [20, 30, 105, 15, 85, 20, 30, 105, 15, 85, 20, 30, 105, 15, 85, 20, 30, 105, 15, 85];

var height = 200,
    width = 720,
    barWidth = 40,
    barOffset = 20;

var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.05);
 
var yScale = d3.scaleLinear()
        .domain([0, d3.max(trackBarsArray)])
        .range([0, height]);

var xScale = d3.scaleLinear()
        .domain([0, trackBarsArray.length])
        .range([0,width]);

 
d3.select('#bar-chart').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#dff0d8')
  .selectAll('rect').data(trackBarsArray)
  .enter().append('rect')
    .style('fill', '#3c763d')
    .attr("width", (width/trackBarsArray.length -1))
    .attr('height', function (data) {
        return yScale(data);
    })
      .attr('x', function (data, i) {
        console.log("xScale(i)", xScale(i));
        return xScale(i);
    })
    .attr('y', function (data) {
        console.log("yScale(i)", height-yScale(data));
        return height - yScale(data);
    });


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