/*jslint browser: true*/
/*global console, hrApp*/

hrApp.angular.controller('DetailPageController', ['$scope', '$http', 'InitService', 'DataService', function ($scope, $http, InitService, DataService) {
  'use strict';
  
  $scope.onCommentClicked = function () {
	    DataService.commentClicked($scope.kitchen);
	  }
  
  $scope.comments= [];
  
  DataService.addEventListener('kitchenClicked', function (kitchen) {
    $scope.kitchen = kitchen;
    console.log(kitchen);
    
    DataService.getComments(kitchen.id, kitchen.type).then(function (result) {
        console.log(result.data.comments);
        $scope.comments = result.data.comments;
      }, function (err) {
        console.error(err);
    });
      
  }); 
  
}]);