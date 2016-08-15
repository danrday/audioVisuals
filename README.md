# Charting Variation in Song Tempo
##using D3 and the Spotify API
###Front-End Capstone Project for Nashville Software School

##Project Goals:

Determine to what extent a given song's tempo speeds up or slows down over the course of a song.
  
Interpret large data sets. Spotify's API provides a detailed analysis file for each song in its' catalogue, including the length of each beat, bar, etc. in that song.

Example from a Spotify song analysis file: 

```js
"beats": [
    {
      "start": 0.19322,
      "duration": 0.42275,
      "confidence": 0.061
    },
    {
      "start": 0.61597,
      "duration": 0.42643,
      "confidence": 0.896
    },
    {
      "start": 1.0424,
      "duration": 0.41907,
      "confidence": 0.955
    },
```

##Resources
###These links helped me implement D3 and UI-Router:

https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views
https://medium.com/@mbostock/introducing-d3-scale-61980c51545f#.knq539kkq
https://www.lynda.com/D3js-tutorials/Data-Visualization-D3js/162449-2.html
http://pothibo.com/2013/09/d3-js-how-to-handle-dynamic-json-data/
http://javascript.tutorialhorizon.com/2015/01/17/d3-fundamentals-understanding-domain-range-and-scales-in-d3js/
https://github.com/d3/d3/blob/master/API.md
http://chimera.labs.oreilly.com/books/1230000000345/ch07.html#_creating_a_scale
https://bost.ocks.org/mike/bar/3/
https://www.dashingd3js.com/d3js-scales
http://vegibit.com/create-a-bar-chart-with-d3-javascript/
https://github.com/angular-ui/ui-router/wiki/Quick-Reference#stategoto--toparams--options
http://angular-ui.github.io/ui-router/site/#/api/ui.router.state.directive:ui-sref
