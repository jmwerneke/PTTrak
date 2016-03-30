/*jslint browser: true*/
/*global console, hrApp*/

var category = 'meal';  // in the gloval scope

hrApp.angular.controller('IndexPageController', ['$scope', '$rootScope', '$http', 'InitService', 'DataService', 'GMapService', function ($scope, $rootScope, $http, InitService, DataService, GMapService) {
  'use strict';
  
  var pages = {
	meal :{title: "Hot Meals",keyword:'meal'},
	pantry :{title: "Food Pantries", keyword:'pantry'},
	wic :{title: "WIC", keyword:'wic'},
	ebt :{title: "EBT",keyword:'ebt'},
	housing: {title: "Housing",keyword:'shelter'},
	mental_health: {title: "Mental Health",keyword:'mental health'},
	healthcare:{title: "Health Care",keyword:'healthcare'},
	employment:{title:"Employment",keyword:'employment'},
	safety:{title:'Safety', keyword:'safety'}
  } ;
  
  $scope.openToday=true;
  
  $scope.onItemClicked = function (resource) {
    DataService.resourceClicked(resource);
  }
  
  $scope.resources = {};
  $scope.markers = {};
  
  
//Angular event listener. Gets called when user clicks on upcoming movies tab
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
  
  
  hrApp.fw7.app.onPageInit('indexPage', function(page) { 
	  initScope(page);
	  /*
	  $scope.page = pages[category];
	  $rootScope.title = $scope.page.title;
    // 	console.log('onPageInit2 with: '+ category); 	       	
 		getResourceData();   // run function 
 		*/
  });
  hrApp.fw7.app.onPageReinit('indexPage', function(page) { 
	  initScope(page);
   });
  
 /*InitService.addEventListener('ready', function () {
	});
*/
  
    function initScope(page){
    	$scope.resources = {};
    	$scope.markers = {};
    	$scope.page = pages[category];
   	  	$rootScope.title = $scope.page.title;
   	  	getResourceData();  
    }
  
  
	function getResourceData(){
		//console.log('keyword: '+$scope.page.keyword);
	    DataService.getLocations($scope.page.keyword,2)
	    	.then(function (result) {	    		
	    		//$scope.resources = angular.fromJson(result.data);
	    		var locations = angular.fromJson(result.data);
	    		
	    		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    		var labelIndex = 0;
	    		GMapService.initMap('google-map1');
	    		for(var idx in locations){
		    		//for(var idx in $scope.resources){
	    			var r= locations[idx];
	    			$scope.resources[r.slug]= r;
	    			if(angular.isNumber(r.latitude) && angular.isNumber(r.latitude)){
	    				var label = labels[labelIndex++ % labels.length];
	    				//$scope.resources[idx].label = label;
	    				//r.marker= GMapService.placeMarker(r.latitude,r.longitude, label);
	  
	    				$scope.markers[r.slug]=  GMapService.placeMarker(r.latitude,r.longitude, label);
	    				//console.log("adding marker for " + r.name);
	    		    }
	    			getResourceDetails(r);
	    		}
	    	}, 
	    	function (err) {
	    		console.error('error getting data '+err);
	    	}    	);
	    
	}
	
	function getResourceDetails(resource){
		DataService.getDetailInfo(resource.slug)
    	.then(function (result) {	 
    		$scope.resources[resource.slug] = result.data;
    		console.log(result.data);
    	});
		
	}
	
}]);