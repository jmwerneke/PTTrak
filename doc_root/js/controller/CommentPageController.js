/*jslint browser: true*/
/*global console, hrApp*/

hrApp.angular.controller('ReviewPageController', ['$scope', '$http', 'InitService', 'DataService', function ($scope, $http, InitService, DataService) {
  'use strict';
  
  $scope.onRate = function(rating){
	 $scope.review.stars=rating;
	 console.log(rating+' stars'); 
  }
  
  $scope.review = {stars:0};
  
  // calling our submit function.
    $scope.submitForm = function() {
    	console.log('click submit review');
    // Posting data to php file
    $http({
      method  : 'POST',
      url     : 'save.php',
      data    : $scope.review, //forms user object
      headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
     })
      .success(function(data) {
    	  /*
        if (data.errors) {
          // Showing errors.
          $scope.errorName = data.errors.name;
          $scope.errorUserName = data.errors.username;
          $scope.errorEmail = data.errors.email;
        } else {
          $scope.message = data.message;
        } */
    	  hrApp.fw7.views[0].router.back();
    	  hrApp.fw7.app.addNotification({
    	        title: 'Thank You',
    	        message: 'Your review was received'
    	    });
      }); 
    	  
    }; // end of submitForm()
  
  
  DataService.addEventListener('reviewClicked', function (resource) {
    $scope.resource = resource;
    $scope.review.table = 'reviews';
    $scope.review.resource_id = resource.id;
    $scope.review.resource_type = resource.type;
    $scope.review.rating = 0;
    console.log('leaving a review for '+resource.type+' '+resource.id);
  });
  
}]);