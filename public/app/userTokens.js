"use strict";

let accessToken = null;
let refreshToken = null;

exports.setTokens = function(accessTokenFromSpotify, refreshTokenFromSpotify) {
  accessToken = accessTokenFromSpotify;
  refreshToken = refreshTokenFromSpotify;
  console.log("accessToken", accessToken);
  console.log("refreshToken", refreshToken);
};

exports.getAccessToken = function () {
  return accessToken;
}