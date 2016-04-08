/*jslint browser: true*/
/*global console, hrApp*/

hrApp.angular.controller('DetailPageController', ['$scope', '$http', 'InitService', 'DataService', function ($scope, $http, InitService, DataService) {
  'use strict';
  
  $scope.onreviewClicked = function () {
	    DataService.reviewClicked($scope.resource);
	  }
  
  $scope.onAddToFavorites = function () {
	   if($scope.resource.isFavorite)
	       DataService.removeFromFavorites($scope.resource);
	   else
		   DataService.addToFavorites($scope.resource);
	   $scope.resource.isFavorite = ! $scope.resource.isFavorite;
  }
  
  
  //$scope.emailBody = encodeURIComponent( $scope.resource.description);
  
  $scope.reviews= [];
  
  DataService.addEventListener('resourceClicked', function (resource) {
    $scope.resource = resource;
    console.log(resource);
    
    DataService.getreviews(resource.id, resource.type).then(function (result) {
        console.log(result.data.reviews);
        $scope.reviews = result.data.reviews;
      }, function (err) {
        console.error(err);
    });
      
  }); 
  
}]);