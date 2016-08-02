"use strict";

app.controller("TestingCtrl", function($scope) {

let bardata = [20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80, 20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80, 20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80, 20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80, 20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80,20, 30, 20, 15, 40, 80];


var height = 200,
    width = 720,
    barWidth = 40,
    barOffset = 20;

var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.05);
 
var yScale = d3.scaleLinear()
        .domain([0, d3.max(bardata)])
        .range([0, height]);

var xScale = d3.scaleBand()
        .domain(d3.range(0, bardata.length))
        .range(d3.range(0, width))
        .paddingInner([.2])

var colors = d3.scaleLinear()
        .domain([d3.min(bardata), d3.max(bardata)])
        .range(['#FFB832', '#C61C6F']);

d3.select('#test-chart').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#dff0d8')
  .selectAll('rect').data(bardata)
  .enter().append('rect')
    .style('fill', colors)
    .attr("width", function() {
      console.log("xScale.bandwidth", xScale.bandwidth()*width)
      return xScale.bandwidth()*width
    })
    .attr('height', function (data) {
        return yScale(data);
    })
      .attr('x', function (data, i) {
        console.log("xScale(i)", xScale(i));
        return xScale(i)*width;
    })
    .attr('y', function (data) {
        // console.log("yScale(i)", height-yScale(data));
        return height - yScale(data);
    });

});