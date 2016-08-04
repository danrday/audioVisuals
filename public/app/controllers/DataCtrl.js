"use strict";

app.controller("DataCtrl", function($scope, $rootScope, $sce, GraphStorage, AuthFactory) {

//SAVE TRACK

// initial chart colors on page load
// let color1 = '#2ead16';
// let color2 = '#C61C6F';
// let color3 = "";

let trackId = $scope.trackAudioFeatures.id;

  $scope.newGraph = {
    graphType: "barChartTrackBars",
    trackId: trackId,
    renderColor1: "#2ead16",
    renderColor2: "#C61C6F",
    renderColor3: "#dff0d8",
    updateColor1: "#2ead16",
    updateColor2: "#C61C6F",
    updateColor3: "#dff0d8",
    song: $scope.songGeneralInfo.song,
    artist: $scope.songGeneralInfo.artist,
    album: $scope.songGeneralInfo.album
  }

  console.log("scopeCustomColors", $scope.customColors)


  $scope.saveNewGraph = function() {

    let trackJSON = {
      trackId: trackId,
      trackAudioFeatures: $scope.trackAudioFeatures,
      trackAnalysis: $scope.trackAnalysis,
      trackDiscog: $scope.trackDiscog
    }

    console.log("trackJSON from dataCTRL", trackJSON)

    $scope.newGraph.uid = AuthFactory.getUser();

    GraphStorage.postNewGraph($scope.newGraph, trackId)
    .then(function() {
      GraphStorage.postJSONData(trackJSON)
      // $location.url("/boards");
    }).then(function() {
      console.log("success")
      // $location.url("/boards");
    })
  };


//SAVE TRACK

// edit track



// update stuff

$scope.putEditTrack = function() {
  $scope.newGraph.uid = AuthFactory.getUser();
  console.log("SCOPE ID", $scope.fbId)
    GraphStorage.putTrack($scope.fbId, $scope.newGraph)
    .then(function(message) {

      console.log(message);
      // $location.url("/boards");
    })

  };



// update stuff

// edit track

$scope.color = "";

$scope.selectedColor = function () {
  console.log($scope.color);
}

let trackAnalysis = $scope.trackAnalysis;

//track bars OBJECT, if over 99 broken into objects of 99 or less
let trackBars = trackAnalysis.bars;

let trackBarsLength = trackBars.length;

console.log("trackBars", trackBars)

console.log("trackBars typeOf", typeof(trackBarsLength));

//holds an array of the length of each bar
let trackBarsArray = [];

//holds an array of the "confidence" of each bar
let barsConfidence = [];

//pushes every bar's duration into a new array
for (let i = 0; i < trackBarsLength; i++) {
  let currentBarLength = trackBars[i].duration;
  trackBarsArray.push(currentBarLength);
}

//pushes every bar's duration into a new array
for (let i = 0; i < trackBarsLength; i++) {
  let currentConfidence = trackBars[i].confidence;
  barsConfidence.push(currentConfidence);
}

console.log("barsConfidence", barsConfidence);

//these two functions allow us to work with multiple dimensions of the json data

var confidenceFn = function(d) { return d.confidence; }

var barsDurationFn = function(d) { return d.duration; }

var height = 200,
    width = 720,
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



let spotifyEmbed = "https://embed.spotify.com/?uri=" + $scope.trackAudioFeatures.uri; 
$rootScope.someUrl = $sce.trustAsResourceUrl(`${spotifyEmbed}`);


$scope.$watch('newGraph.updateColor1', function(newVal, oldVal) {
        if (!newVal) {return};

        // color1 = newVal;

        // console.log("color1", color1);

        let colors3 = d3.scaleLinear()
        .domain(d3.extent(trackAnalysis.bars, barsDurationFn))
        .range([`${newVal}`, `${$scope.newGraph.updateColor2}`]); 

        // colors;

        d3.selectAll('rect').style('fill', function(data) {
      return colors3(barsDurationFn(data));
    })
});


$scope.$watch('newGraph.updateColor2', function(newVal, oldVal) {
        if (!newVal) {return};

        // color2 = newVal;

        // console.log("color2", color2);

        let colors3 = d3.scaleLinear()
        .domain(d3.extent(trackAnalysis.bars, barsDurationFn))
        .range([`${$scope.newGraph.updateColor1}`, `${newVal}`]); 

        // colors;

        d3.selectAll('rect').style('fill', function(data) {
      return colors3(barsDurationFn(data));
    })
});

 $scope.$watch('newGraph.updateColor3', function(newVal, oldVal) {
        if (!newVal) {return};

        // color3 = newVal;

        // console.log("color2", color3);

        d3.select('svg').style('background', `${newVal}`)

    //     color1 = $scope.color;
    //     d3.selectAll('rect').data(trackAnalysis.bars).enter().style('fill', function(data) {
    //     return colors(barsDurationFn(data));
    // });
});


        
var colors = d3.scaleLinear()
        .domain(d3.extent(trackAnalysis.bars, barsDurationFn))
        .range([`${$scope.newGraph.updateColor1}`, `${$scope.newGraph.updateColor2}`]);

var songChart = d3.select('#bar-chart').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', $scope.newGraph.updateColor3)
  .selectAll('rect').data(trackAnalysis.bars)
  .enter().append('rect')
    .style('fill', function(data) {
      return colors(barsDurationFn(data));
    })
    .attr("width", function(data) {
      return xScale.bandwidth()*width;
    })
    .attr('height', function (data) {
        return yScale(barsDurationFn(data));
    })
      .attr('x', function (data, i) {
        // console.log("xScale(i)", xScale(i));
        return xScale(i)*width;
    })
    .attr('y', function (data) {
        // console.log("yScale(i)", height-yScale(data));
        return height - yScale(barsDurationFn(data));
    });

});