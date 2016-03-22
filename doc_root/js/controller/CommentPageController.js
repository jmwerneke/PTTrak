/*jslint browser: true*/
/*global console, hrApp*/

hrApp.angular.controller('CommentPageController', ['$scope', '$http', 'InitService', 'DataService', function ($scope, $http, InitService, DataService) {
  'use strict';
  
  DataService.addEventListener('commentClicked', function (resource) {
    $scope.resource = resource;
    console.log('leaving a commentfor '+resource.type+' '+resource.id);
  });
  
}]);