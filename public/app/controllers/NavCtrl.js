"use strict";

app.controller("NavCtrl", function($http, $scope, $rootScope, Spotify) {

//contains 20 track results matching search criteria
$scope.searchResults = {};

//contains basic track information
$scope.trackAudioFeatures = {};

//contains detailed track information
$scope.trackAnalysis = {};

//search for tracks by search criteria 
$scope.searchAlbums = function(query) {
    Spotify.search(query, 'track').then(function (data) {
    $scope.searchResults = data.tracks.items;
  });
};


$scope.goToTrack = function() {

  // app.config(function (SpotifyProvider) {

  // let authToken = userTokens.getAccessToken();


    $.ajax({
      method: 'GET',
      url: 'http://localhost:8888/getToken',
      success: function(data) {
        console.log(data);
      }
    });

}


//   SpotifyProvider.setClientId('200cab8c6a8940f4be9d952603af82d7');
//   SpotifyProvider.setRedirectUri('http://localhost:8888/callback');
//   // If you already have an auth token
//   SpotifyProvider.setAuthToken(authToken);
// });


//   Spotify.getTrackAudioFeatures(id).then(function (data) {
//   console.log(data);
// });



// var templateSource = document.getElementById('results-template').innerHTML,
//     template = Handlebars.compile(templateSource),
//     resultsPlaceholder = document.getElementById('results'),
//     playingCssClass = 'playing',
//     audioObject = null;

// var fetchTracks = function (albumId, callback) {
//     $.ajax({
//         url: 'https://api.spotify.com/v1/albums/' + albumId,
//         success: function (response) {
//             callback(response);
//         }
//     });
// };

// var searchAlbums = function (query) {
//     $.ajax({
//         url: 'https://api.spotify.com/v1/search',
//         data: {
//             q: query,
//             type: 'album'
//         },
//         success: function (response) {
//             resultsPlaceholder.innerHTML = template(response);
//         }
//     });
// };

// results.addEventListener('click', function (e) {
//     var target = e.target;
//     if (target !== null && target.classList.contains('cover')) {
//         if (target.classList.contains(playingCssClass)) {
//             audioObject.pause();
//         } else {
//             if (audioObject) {
//                 audioObject.pause(s);
//             }
//             fetchTracks(target.getAttribute('data-album-id'), function (data) {
//                 audioObject = new Audio(data.tracks.items[0].preview_url);
//                 audioObject.play();
//                 target.classList.add(playingCssClass);
//                 audioObject.addEventListener('ended', function () {
//                     target.classList.remove(playingCssClass);
//                 });
//                 audioObject.addEventListener('pause', function () {
//                     target.classList.remove(playingCssClass);
//                 });
//             });
//         }
//     }
// });

// document.getElementById('search-form').addEventListener('submit', function (e) {
//     e.preventDefault();
//     searchAlbums(document.getElementById('query').value);
// }, false);





});