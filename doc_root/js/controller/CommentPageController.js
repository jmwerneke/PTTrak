/*jslint browser: true*/
/*global console, hrApp*/

hrApp.angular.controller('CommentPageController', ['$scope', '$http', 'InitService', 'DataService', function ($scope, $http, InitService, DataService) {
  'use strict';
  
  $scope.comment = {};
  // calling our submit function.
    $scope.submitForm = function() {
    	console.log('click submit comment');
    // Posting data to php file
    $http({
      method  : 'POST',
      url     : 'save.php',
      data    : $scope.comment, //forms user object
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
    	        message: 'Your Comment was received'
    	    });
      }); 
    	  
    }; // end of submitForm()
  
  
  DataService.addEventListener('commentClicked', function (resource) {
    $scope.resource = resource;
    $scope.comment.table = 'comments';
    $scope.comment.resource_id = resource.id;
    $scope.comment.resource_type = resource.type;
    $scope.comment.rating = 0;
    console.log('leaving a comment for '+resource.type+' '+resource.id);
  });
  
}]);