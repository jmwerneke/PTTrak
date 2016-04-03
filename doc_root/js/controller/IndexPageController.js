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
		
		var myLatLng = GMapService.myLatLng;
		//console.log('keyword: '+$scope.page.keyword);
	    DataService.getLocations($scope.page.keyword, myLatLng)
	    	.then(function (result) {	    		
	    		//$scope.resources = angular.fromJson(result.data);
	    		var locations = angular.fromJson(result.data);
	    		locations= orderByDistance(locations, myLatLng);
	    		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    		var labelIndex = 0;
	    		GMapService.initMap('google-map1');
	    		for(var idx in locations){		    		
	    			var r= locations[idx];		
	    			if(angular.isNumber(r.latitude) && angular.isNumber(r.latitude)){
	    				var label = labels[labelIndex++ % labels.length];
	    				// save the markers and distances in a separate array, since the locations are overwritten
	    				$scope.markers[r.slug]= {label:label, distance:r.distance, marker: GMapService.placeMarker(r.latitude,r.longitude, label) };	    				
	    		    }
	    			$scope.resources[r.slug]= r;
	    			getResourceDetails(r);
	    		}
	    	}, 
	    	function (err) {
	    		console.error('error getting data '+err);
	    	}    	);
	    
	}
	
	function orderByDistance(locations, myLoc){
		var myLat= myLoc.lat;
		var myLng = myLoc.lng;
		console.log('mylat: '+myLat+'  mylong: '+myLng)
		var unlocs=[];
		for(var idx in locations){		    		
			var r= locations[idx];	
			var deltaLat = Math.abs(r.latitude - myLat) * 68; //62.5; //1/0.016;
			var deltaLng = Math.abs(r.longitude - myLng) * 57; //52.6; //1/0.019;
			console.log(r.slug +' dlat: '+deltaLat +'   dlng: '+deltaLng);
			r.distance= Math.round(Math.pow(Math.pow(deltaLat,2) + Math.pow(deltaLng,2), 0.5) *10)/10;
			unlocs.push(r); 			
		}
		var olocs = unlocs.sort(function(a, b) {
		        return ((a.distance < b.distance) ? -1 : 1);
		    });
		return olocs;
	}
	
	
	function getResourceDetails(resource){
		DataService.getDetailInfo(resource.slug)
    	.then(function (result) {	 
    		$scope.resources[resource.slug] = result.data;
    		console.log(result.data);
    	});
		
	}
	
}]);