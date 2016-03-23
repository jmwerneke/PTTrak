/*jslint browser: true*/
/*global console, hrApp*/

hrApp.angular.controller('IndexPageController', ['$scope', '$http', 'InitService', 'DataService', function ($scope, $http, InitService, DataService) {
  'use strict';
  
  $scope.openToday=true;
  
  $scope.onItemClicked = function (kitchen) {
    DataService.kitchenClicked(kitchen);
  }
  
//Angular event listener. Gets called when user clicks on upcoming movies tab
  $scope.onOpenTodayClicked= function(today){
	  if(today>0){
		  $scope.openToday=true;
		  console.error('todays kitchens');
	  }
	  else{
		  $scope.openToday=false;
		  console.error('all kitchens');
	  }
	
  }
  
  
  InitService.addEventListener('ready', function () {
	  
    DataService.getKitchens('http://localhost/kitchens/kitchendata.json').then(function (result) {
      console.log(result.data.kitchens);
      $scope.kitchens = result.data.kitchens;
    }, function (err) {
      console.error(err);
    });
    
  });
  
}]);