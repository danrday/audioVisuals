"use strict";

app.controller("SectionsTempoCtrl", function($scope, $rootScope, $sce, GraphStorage, AuthFactory) {


// timer stuff

// $scope.hundredthSecond = 0;

// $scope.second = 0;

// $scope.minute = 0;

// $scope.countdown = 5;

// $scope.hundredthSecCountdown = 0;


// $scope.setTimer = function () {
//   setInterval(function() {
//  $scope.hundredthSecond++
//  $scope.$apply();

//  if ($scope.hundredthSecond%100 === 0) {
//   if($scope.second === 59) {
//     $scope.second = 0;
//     $scope.minute++;
//     $scope.$apply();
//   } else {
//       $scope.second++
//       $scope.$apply();
//     }
//  }

//  console.log($scope.hundredthSecond)
// }, 10)
// }


// $scope.armTrack = function () {
//   setInterval(function() {
//  $scope.hundredthSecCountdown++
//  $scope.$apply();

//  if ($scope.hundredthSecCountdown%100 === 0) {
//   if($scope.countdown === 1) {
//     clearInterval(armTrack)
//     $scope.setTimer();
//     $scope.$apply();
//   } else {
//       $scope.countdown --;
//       $scope.$apply();
//     }
//  }

//  console.log($scope.hundredthSecond)
// }, 10)
// }


// timer stuff


  // toggles the color picker button on a graph
  //starts out display = false




  $scope.openColorPicker = false;

  $scope.toggleColorPicker = function () {
    $scope.openColorPicker = !$scope.openColorPicker
  };
 
  let trackId = $scope.trackAudioFeatures.id;

  let spotifyEmbed = "https://embed.spotify.com/?uri=" + $scope.trackAudioFeatures.uri; 
  $rootScope.someUrl = $sce.trustAsResourceUrl(`${spotifyEmbed}`);

  //SAVE TRACK CODE

  // $scope.newGraph = {
  //   graphType: "barChartTrackBars",
  //   trackId: trackId,
  //   updateColor1: "#2ead16",
  //   updateColor2: "#C61C6F",
  //   updateColor3: "#dff0d8",
  //   song: $scope.songGeneralInfo.song,
  //   artist: $scope.songGeneralInfo.artist,
  //   album: $scope.songGeneralInfo.album
  // }

  // if ($scope.isLoadingSavedTrack === true) {
  //   $scope.newGraph.updateColor1 = $scope.savedColors.color1;
  //   $scope.newGraph.updateColor2 = $scope.savedColors.color2;
  //   $scope.newGraph.updateColor3 = $scope.savedColors.color3;
  //   console.log("newGraph old color bg = dff0d8, new:", $scope.newGraph);
  // }

  $scope.$watch('newGraph.updateColor1', function(newVal, oldVal) {
          if (!newVal) {return};

          let colors3 = d3.scaleLinear()
          .domain(d3.extent(trackAnalysis.sections, tempoFn))
          .range([`${newVal}`, `${$scope.newGraph.updateColor2}`]); 

          sectionsTempo.selectAll('rect').style('fill', function(data) {
        return colors3(tempoFn(data));
      })
  });

  $scope.$watch('newGraph.updateColor2', function(newVal, oldVal) {
          if (!newVal) {return};

          let colors3 = d3.scaleLinear()
          .domain(d3.extent(trackAnalysis.sections, tempoFn))
          .range([`${$scope.newGraph.updateColor1}`, `${newVal}`]); 

          sectionsTempo.selectAll('rect').style('fill', function(data) {
        return colors3(tempoFn(data));
      })
  });

    //the first 'rect' is the 3rd child of beatChart, so we start at 2
  let currentBar = 2;

  let indexOfBar = 0;

  $scope.$watch('hundredthSecond', function (newVal, oldVal) {
    if (!newVal) {return};


    if ($scope.hundredthSecond >= (trackAnalysis.sections[indexOfBar].start * 100)) {
      currentBar++;
      sectionsTempo.select(`rect:nth-child(${currentBar})`).style('fill', 'yellow');
      indexOfBar ++;
      console.log(indexOfBar)
    }
    
    });

  // JSON DATA

  let trackAnalysis = $scope.trackAnalysis;

  //these functions allow us to pass a d3 graph multiple dimensions of the json data
  let tempoFn = function(d) { return d.tempo; }
 

  let margin = {top: 20, right: 30, bottom: 30, left: 40}

  //chart 1 specs
  var height = 200 - margin.top - margin.bottom,
      width = 1100 - margin.left - margin.right,
      barWidth = 40,
      barOffset = 20;

  var x = d3.scaleBand().rangeRound([0, width])

  var yScale = d3.scaleLinear()
          .domain(d3.extent(trackAnalysis.sections, tempoFn))
          .range([0, height]);

  var xScale = d3.scaleBand()
          .domain(d3.range(0, trackAnalysis.sections.length))
          .range(d3.range(0, width))
          .paddingInner(.2);

// axis stuff

  var yAxisTicks = d3.scaleLinear()
          .domain(d3.extent(trackAnalysis.sections, tempoFn))
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
          .domain(d3.extent(trackAnalysis.sections, tempoFn))
          .range([`${$scope.newGraph.updateColor1}`, `${$scope.newGraph.updateColor2}`]);


  let tempColor = null;

  var sectionsTempo = d3.select('#sectionsTempo').append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  sectionsTempo.append("g")
          .attr("transform", "translate(" + -5 + ",0)")
          .call(yAxis);

   // draw x axis with labels and move to the bottom of the chart area
  sectionsTempo.append("g")
      .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
      .attr("transform", "translate(0," + (height + 5) + ")")
      .call(xAxis);

    d3.selectAll('svg').style('background', `{$scope.newGraph.updateColor3}`)

    sectionsTempo.selectAll('rect').data(trackAnalysis.sections)
    .enter().append('rect')
      .style('fill', function(data) {
        return colors(tempoFn(data));
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

        tooltip.html(tempoFn(d))
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


    sectionsTempo.selectAll("rect").transition()
    .attr('height', function (data) {
          return yScale(tempoFn(data));
      })
    .attr('y', function (data) {
          // console.log("yScale(i)", height-yScale(data));
          return (height - yScale(tempoFn(data)));
      })
    .delay(function(d, i) { return i * 5; })
    .duration(500)

});