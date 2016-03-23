/*jslint browser: true*/
/*global console, hrApp, angular, Framework7*/

// Init angular
var hrApp = {};

hrApp.config = {
};

hrApp.angular = angular.module('hrApp', []);

hrApp.fw7 = {
  app : new Framework7({
    animateNavBackIcon: true
  }),
  options : {
    dynamicNavbar: true,
    domCache: true
  },
  views : []
};

