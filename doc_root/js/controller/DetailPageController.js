/*jslint browser: true*/
/*global console, hrApp*/

hrApp.angular.controller('DetailPageController', ['$scope', '$http', 'InitService', 'DataService', function ($scope, $http, InitService, DataService) {
  'use strict';
  
  $scope.onCommentClicked = function () {
	    DataService.commentClicked($scope.kitchen);
	  }
    
  DataService.addEventListener('kitchenClicked', function (kitchen) {
    $scope.kitchen = kitchen;
    console.log(kitchen);
  });
  
}]);