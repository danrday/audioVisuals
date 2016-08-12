"use strict";

app.controller("BeatChartCtrl", function($scope, $rootScope, $sce, GraphStorage, AuthFactory) {


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

 //  $scope.$watch('newGraph.updateColor1', function(newVal, oldVal) {
 //          if (!newVal) {return};

 //          let colors3 = d3.scaleLinear()
 //          .domain(d3.extent(trackAnalysis.bars, barsDurationFn))
 //          .range([`${newVal}`, `${$scope.newGraph.updateColor2}`]); 

 //          d3.selectAll('rect').style('fill', function(data) {
 //        return colors3(barsDurationFn(data));
 //      })
 //  });

 //  $scope.$watch('newGraph.updateColor2', function(newVal, oldVal) {
 //          if (!newVal) {return};

 //          let colors3 = d3.scaleLinear()
 //          .domain(d3.extent(trackAnalysis.bars, barsDurationFn))
 //          .range([`${$scope.newGraph.updateColor1}`, `${newVal}`]); 

 //          d3.selectAll('rect').style('fill', function(data) {
 //        return colors3(barsDurationFn(data));
 //      })
 //  });

 // $scope.$watch('newGraph.updateColor3', function(newVal, oldVal) {
 //        if (!newVal) {return};
 //        d3.select('svg').style('background', `${newVal}`)
 //  });

  // $scope.saveNewGraph = function() {

  //   let trackJSON = {
  //     trackId: trackId,
  //     trackAudioFeatures: $scope.trackAudioFeatures,
  //     trackAnalysis: $scope.trackAnalysis,
  //     trackDiscog: $scope.trackDiscog
  //   }

  //   console.log("trackJSON from dataCTRL", trackJSON)

  //   $scope.newGraph.uid = AuthFactory.getUser();

  //   GraphStorage.postNewGraph($scope.newGraph, trackId)
  //   .then(function() {
  //     GraphStorage.postJSONData(trackJSON)
  //     // $location.url("/boards");
  //   }).then(function() {
  //     console.log("success")
  //     // $location.url("/boards");
  //   })
  // };

  //END SAVE TRACK

  // edit track

  // $scope.putEditTrack = function() {
  //   $scope.newGraph.uid = AuthFactory.getUser();
  //   console.log("SCOPE ID", $scope.fbId)
  //     GraphStorage.putTrack($scope.fbId, $scope.newGraph)
  //     .then(function(message) {

  //       console.log(message);
  //       // $location.url("/boards");
  //     })
  // };

  // end edit track

  // JSON DATA

  let trackAnalysis = $scope.trackAnalysis;

  //these functions allow us to pass a d3 graph multiple dimensions of the json data
  let confidenceFn = function(d) { return d.confidence; }
  let barsDurationFn = function(d) { return d.duration; }

  let margin = {top: 20, right: 30, bottom: 30, left: 40}

  //chart 1 specs
  var height = 250 - margin.top - margin.bottom,
      width = 950 - margin.left - margin.right,
      barWidth = 40,
      barOffset = 20;

  var x = d3.scaleBand().rangeRound([0, width])

  var yScale = d3.scaleLinear()
          .domain(d3.extent(trackAnalysis.bars, barsDurationFn))
          .range([0, height]);

  var xScale = d3.scaleBand()
          .domain(d3.range(0, trackAnalysis.bars.length))
          .range(d3.range(0, width))
          .paddingInner(.2);

// axis stuff

  var yAxisTicks = d3.scaleLinear()
          .domain(d3.extent(trackAnalysis.bars, barsDurationFn))
          .range([height, 0]);

  var xAxisTicks = d3.scaleLinear()
          .domain([0, trackAnalysis.bars.length])
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
          .domain(d3.extent(trackAnalysis.bars, barsDurationFn))
          .range([`${$scope.newGraph.updateColor1}`, `${$scope.newGraph.updateColor2}`]);


  let tempColor = null;

  var beatChart = d3.select('#beat-chart').append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  beatChart.append("g")
          .attr("transform", "translate(" + -5 + ",0)")
          .call(yAxis);

   // draw x axis with labels and move to the bottom of the chart area
  beatChart.append("g")
      .attr("class", "xaxis")   // give it a class so it can be used to select only xaxis labels  below
      .attr("transform", "translate(0," + (height + 5) + ")")
      .call(xAxis);

    d3.selectAll('svg').style('background', `{$scope.newGraph.updateColor3}`)

    beatChart.selectAll('rect').data(trackAnalysis.bars)
    .enter().append('rect')
      .style('fill', function(data) {
        return colors(barsDurationFn(data));
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

        tooltip.html(barsDurationFn(d))
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


    d3.selectAll("rect").transition()
    .attr('height', function (data) {
          return yScale(barsDurationFn(data));
      })
    .attr('y', function (data) {
          // console.log("yScale(i)", height-yScale(data));
          return (height - yScale(barsDurationFn(data)));
      })
    .delay(function(d, i) { return i * 25; })
    .duration(500)

});