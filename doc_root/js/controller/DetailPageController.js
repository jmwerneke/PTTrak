/*jslint browser: true*/
/*global console, hrApp*/

hrApp.angular.controller('DetailPageController', ['$scope', '$http', 'InitService', 'DataService', function ($scope, $http, InitService, DataService) {
  'use strict';
  
  $scope.onCommentClicked = function () {
	    DataService.commentClicked($scope.resource);
	  }
  
  $scope.comments= [];
  
  DataService.addEventListener('resourceClicked', function (resource) {
    $scope.resource = resource;
    console.log(resource);
    
    DataService.getComments(resource.id, resource.type).then(function (result) {
        console.log(result.data.comments);
        $scope.comments = result.data.comments;
      }, function (err) {
        console.error(err);
    });
      
  }); 
  
}]);