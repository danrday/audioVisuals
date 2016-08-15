"use strict";

let clientId = process.env.clientId;
let clientSecret = process.env.clientSecret;

exports.getClientId = function () {
  return clientId;
}

exports.getClientSecret = function () {
  return clientSecret;
}