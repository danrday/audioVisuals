"use strict";

app.controller("LoginCtrl", function( $rootScope, $location, $scope, AuthFactory ) {

    // register function 

    // $scope.googleLogin() = function() {
    //   console.log("TEST")
    // }
  
  // $scope.loginGoogle = function() {
  //   AuthFactory.authWithProvider()
  //  .then(function(result) {
  //    var user = result.user.uid;
  //    console.log("logged in user fer sure", user);
  //    // Load to dos?
  //    $location.path("/");
  //    $scope.$apply();
  //  }).catch(function(error) {
  //    // Handle Errors here.
  //    var errorCode = error.code;
  //    var errorMessage = error.message;
  //    // The email of the user's account used.
  //    var email = error.email;
  //    // The firebase.auth.AuthCredential type that was used.
  //    var credential = error.credential;
  //    // ...
  //  });  
  // };

  // logout function
  $scope.logout = function() {
    AuthFactory.signOut();
  }
  // 

  // AuthFactory.getUser()
  // .then ( function() {
  //   if (AuthFactory.currentUser) {
  //     $location.path("/");

  //   }
    
    
  // });



});