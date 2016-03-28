/*jslint browser: true*/
/*global console, hrApp*/

hrApp.angular.controller('IndexPageController', ['$scope', '$http', 'InitService', 'DataService', 'GMapService', function ($scope, $http, InitService, DataService, GMapService) {
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
	
  };
  
  
  hrApp.fw7.app.onPageInit('indexPage', function(page) { 
     	console.log('onPageInit2'); 	       	
 		getKitchenData();   // run function 
  });
   
  
 /*InitService.addEventListener('ready', function () {
	});
*/
  
	function getKitchenData(){
	    DataService.getLocations('wellness',1)
	    	.then(function (result) {	    		
	    		$scope.kitchens = angular.fromJson(result.data);
	    		//console.log($scope);
	    		
	    		GMapService.initMap('google-map1');
	    		for(var idx in $scope.kitchens){
	    			var r= $scope.kitchens[idx];
	    			if(angular.isNumber(r.latitude) && angular.isNumber(r.latitude)){
	    				r.marker= GMapService.placeMarker(r.latitude,r.longitude);
	    				//console.log("adding marker for " + r.name);
	    		    }   			
	    		}
	    	}, 
	    	function (err) {
	    		console.error('error getting data '+err);
	    	}    	);
	    
	}
  
}]);