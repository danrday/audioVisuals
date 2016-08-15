"use strict";

app.controller("SectionsConfidenceCtrl", function($scope, $rootScope, $sce, GraphStorage, AuthFactory) {


  $scope.openColorPicker = false;

  $scope.toggleColorPicker = function () {
    $scope.openColorPicker = !$scope.openColorPicker
  };
 
  let trackId = $scope.trackAudioFeatures.id;

  let spotifyEmbed = "https://embed.spotify.com/?uri=" + $scope.trackAudioFeatures.uri; 
  $rootScope.someUrl = $sce.trustAsResourceUrl(`${spotifyEmbed}`);

  $scope.$watch('newGraph.updateColor1', function(newVal, oldVal) {
          if (!newVal) {return};

          let colors3 = d3.scaleLinear()
          .domain(d3.extent(trackAnalysis.sections, confidenceFn))
          .range([`${newVal}`, `${$scope.newGraph.updateColor2}`]); 

          confidenceSectionTempo.selectAll('rect').style('fill', function(data) {
        return colors3(confidenceFn(data));
      })
  });

  $scope.$watch('newGraph.updateColor2', function(newVal, oldVal) {
          if (!newVal) {return};

          let colors3 = d3.scaleLinear()
          .domain(d3.extent(trackAnalysis.sections, confidenceFn))
          .range([`${$scope.newGraph.updateColor1}`, `${newVal}`]); 

          confidenceSectionTempo.selectAll('rect').style('fill', function(data) {
        return colors3(confidenceFn(data));
      })
  });

    //the first 'rect' is the 3rd child of beatChart, so we start at 2
  let currentBar = 2;

  let indexOfBar = 0;

  $scope.$watch('hundredthSecond', function (newVal, oldVal) {
    if (!newVal) {return};


    if ($scope.hundredthSecond >= (trackAnalysis.sections[indexOfBar].start * 100)) {
      currentBar++;
      confidenceSectionTempo.select(`rect:nth-child(${currentBar})`).transition()
    .on("start", function repeat() {
        d3.active(this)
            .style("fill", "red")
          .transition()
            .style("fill", "green")
          .transition()
            .style("fill", "blue")
          .transition()
            .on("start", repeat);
      });
      indexOfBar ++;
      console.log(indexOfBar)
    }

    
    });

  // JSON DATA

  let trackAnalysis = $scope.trackAnalysis;

  //these functions allow us to pass a d3 graph multiple dimensions of the json data
  let confidenceFn = function(d) { return d.tempo_confidence; }
 

  let margin = {top: 20, right: 30, bottom: 30, left: 40}

  //chart 1 specs
  var height = 200 - margin.top - margin.bottom,
      width = 1100 - margin.left - margin.right,
      barWidth = 40,
      barOffset = 20;

  var x = d3.scaleBand().rangeRound([0, width])

  var yScale = d3.scaleLinear()
          .domain(d3.extent(trackAnalysis.sections, confidenceFn))
          .range([0, height]);

  var xScale = d3.scaleBand()
          .domain(d3.range(0, trackAnalysis.sections.length))
          .range(d3.range(0, width))
          .paddingInner(.2);

// axis stuff

  var yAxisTicks = d3.scaleLinear()
          .domain(d3.extent(trackAnalysis.sections, confidenceFn))
          .range([height, 0]);

  var xAxisTicks = d3.scaleLinear()
          .domain([0, trackAnalysis.sections.length])
          .range([0, width]);

  var yAxis = d3.axisLeft()
      .scale(yAxisTicks);

  var xAxis = d3.axisBottom()
      .scale(xAxisTicks);

  // axis stuff

  var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0)
          
  var colors = d3.scaleLinear()
          .domain(d3.extent(trackAnalysis.sections, confidenceFn))
          .range([`${$scope.newGraph.updateColor1}`, `${$scope.newGraph.updateColor2}`]);


  let tempColor = null;

  var confidenceSectionTempo = d3.select('#sectionsConfidence').append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  confidenceSectionTempo.append("g")
          .attr("transform", "translate(" + -5 + ",0)")
          .call(yAxis);

   // draw x axis with labels and move to the bottom of the chart area
  confidenceSectionTempo.append("g")
      .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
      .attr("transform", "translate(0," + (height + 5) + ")")
      .call(xAxis);

    d3.selectAll('svg').style('background', `{$scope.newGraph.updateColor3}`)

    confidenceSectionTempo.selectAll('rect').data(trackAnalysis.sections)
    .enter().append('rect')
      .style('fill', function(data) {
        return colors(confidenceFn(data));
      })
      .attr("width", function(data) {
        return xScale.bandwidth()*width;
      })
      .attr('height', 0)
        .attr('x', function (data, i) {
          // console.log("xScale(i)", xScale(i));
          return xScale(i)*width;
      })
      .attr('y', height)
      .on('mouseover', function(d) {

        tooltip.transition()
            .style('opacity', .9)

        tooltip.html(confidenceFn(d))
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top',  (d3.event.pageY - 30) + 'px')

        tempColor = this.style.fill;
        d3.select(this)
            .style('opacity', .5)
            .style('fill', 'yellow')
    })

    .on('mouseout', function(d) {
      tooltip.html("")
        d3.select(this)
            .style('opacity', 1)
            .style('fill', tempColor)
    });


    confidenceSectionTempo.selectAll("rect").transition()
    .attr('height', function (data) {
          return yScale(confidenceFn(data));
      })
    .attr('y', function (data) {
          // console.log("yScale(i)", height-yScale(data));
          return (height - yScale(confidenceFn(data)));
      })
    .delay(function(d, i) { return i * 5; })
    .duration(500)

});