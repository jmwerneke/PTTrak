/*jslint browser: true*/
/*global console, hrApp*/

var globalCat = '';  // in the gloval scope
var globalKeyword='';

hrApp.angular.controller('IndexPageController', ['$scope', '$rootScope', '$http', 'InitService', 'DataService', 'GMapService', function ($scope, $rootScope, $http, InitService, DataService, GMapService) {
  'use strict';
  
  var pages = {
	youth :{title: "Youth",category:'Youth'}, //
	
	// emergency
	medical :{title: "Medical",category:'Medical'},
	mental_health :{title: "Mental Health",category:'Mental Health'},

	//safety
	domestic_violence:{title:'Domestic Violence', category:'domestic_violence'},//
	human_trafficking:{title:'Human Trafficking', category:'Human Trafficking'},//
	sex_trafficking:{title:'Sex Trafficking', category:'Sex Trafficking'},//

	//housing 
	shelter: {title: "Shelter",category:'shelter'},
	affordable_housing: {title: "Affordble Housing",category:'Affordable Housing'},
	transitional_housing: {title: "Transitional Housing",category:'transitional_housing'},
	supportive_Housing: {title: "Permanent Supportive Housing",category:'Permanent Supportive Housing'},
	
	//food
	meals :{title: "Hot Meals",category:'Hot Meals'},
	food_closets :{title: "Food Closets", category:'Food Closets'},
	wic :{title: "WIC", category:'WIC'},
	ebt :{title: "EBT",category:'EBT'},   //
	
	//healthcare
	clinics:{title: 'Community Clinics',category:'Community Clinics'},
	immunization:{title: 'Immunization',category:'Immunization'},
	std:{title: 'STD Testing and Treatment',category:'STD Testing and Treatment'},
	
	
	//mental health
	amental_health: {title: "Adult Mental Health",category:'Adult Mental Health'},//
	cmental_health: {title: "Children's Mental Health",category:"Children\'s Mental Health"},//
	substance_use: {title: "Substance Use",category:'Substance Use'},	
	crisis:{title:'Crisis Support', category:'Crisis Support'},
	groups:{title:'Support Groups', category:'Support Groups'},
	
	legal: {title: "Legal Services",category:'Legal Services'},
	
	employment:{title:"Employment",category:'employment'},
	
	vocational: {title: "Vocational",category:'Vocational'},
	school_districts: {title: "School Districts",category:'School Districts'},
	colleges: {title: "Community Colleges",category:'Community Colleges'},
	
	
	
	
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
    	if(globalCat=='' && globalKeyword =='')
    		return;
    	$scope.resources = {};
    	$scope.markers = {};
    	$scope.page = pages[globalCat];
   	  	$rootScope.title = $scope.page.title;
   	  	getResourceData();  
    }
  
  
	function getResourceData(){
		
		var myLatLng = GMapService.myLatLng;
		//console.log('keyword: '+$scope.page.keyword);
	    DataService.getLocations($scope.page.category, myLatLng, globalKeyword)
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