/*jslint browser: true*/
/*global console, hrApp*/

;

hrApp.angular.controller('FavoritesPageController', ['$scope', '$rootScope', '$http', 'InitService', 'DataService', 'GMapService', function ($scope, $rootScope, $http, InitService, DataService, GMapService) {
  'use strict';
  

  
  $scope.onItemClicked = function (resource) {
    DataService.resourceClicked(resource);
  }
  
  $scope.resources = {};

  
  hrApp.fw7.app.onPageInit('favoritesPage', function(page) { 
	  initScope(page);
	
  });
  hrApp.fw7.app.onPageReinit('favoritesPage', function(page) { 
	  initScope(page);
   });
    
    function initScope(page){
    	$scope.resources = {};
   	  	getResourceData();  
    }
    
	function getResourceData(){
		var location_ids = DataService.getFavorites();
		
		for(var idx in location_ids){		    		
			var id= location_ids[idx];		
			//$scope.resources[r]= r;
			DataService.getDetailInfo(id, $scope.resources);
			//getResourceDetails(r);
		}
	}
	
	
}]);