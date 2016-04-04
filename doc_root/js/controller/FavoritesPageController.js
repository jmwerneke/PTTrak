/*jslint browser: true*/
/*global console, hrApp*/

;

hrApp.angular.controller('FavoritesPageController', ['$scope', '$rootScope', '$http', 'InitService', 'DataService', 'GMapService', function ($scope, $rootScope, $http, InitService, DataService, GMapService) {
  'use strict';
  
  $scope.openToday=true;
  
  $scope.onItemClicked = function (resource) {
    DataService.resourceClicked(resource);
  }
  
  $scope.resources = {};
  $scope.markers = {};
  
  
//Angular event listener. Gets called when user clicks on
  $scope.onOpenTodayClicked= function(today){
	  if(today>0){
		  $scope.openToday=true;
		  console.error('todays resources');
	  }
	  else{
		  $scope.openToday=false;
		  console.error('all resources');
	  }
	
  };
  
  
  hrApp.fw7.app.onPageInit('favoritesPage', function(page) { 
	  initScope(page);
	
  });
  hrApp.fw7.app.onPageReinit('favoritesPage', function(page) { 
	  initScope(page);
   });
    
    function initScope(page){
    	$scope.resources = {};
    	$scope.markers = {};
   	  	getResourceData();  
    }
    
	function getResourceData(){
		var locations = DataService.getFavorites();
		
		for(var idx in locations){		    		
			var r= locations[idx];		
			$scope.resources[r]= r;
			getResourceDetails(r);
		}
	}
	
	
	function getResourceDetails(slug){
		DataService.getDetailInfo(slug)
    	.then(function (result) {	 
    		result.data.isFavorite= true;
    		$scope.resources[slug] = result.data;
    		console.log(result.data);
    	});
		
	}
	
}]);