/*jslint browser: true*/
/*global console, hrApp*/

var globalCat = '';  // in the gloval scope
var globalKeyword='';

hrApp.angular.controller('IndexPageController', ['$scope', '$rootScope', '$http', 'InitService', 'DataService', 'GMapService', function ($scope, $rootScope, $http, InitService, DataService, GMapService) {
  'use strict';
  
  var pages = {
    //search :{title: "Search", category:''},
    search :{title: "Search", params:{keyword:'_'}},
    
	//youth :{title: "Youth",category:'Youth'}, //
	youth :{title: "Youth", params:{category:'Youth'}}, //
	
	// emergency
	medical :{title: "Medical", params:{category:'Medical'}},
	mental_health :{title: "Mental Health", params:{category:'Mental Health'}},

	//safety
	domestic_violence:{title:'Domestic Violence',  params:{category:'Domestic Violence'}},//
	human_trafficking:{title:'Human Trafficking',  params:{category:'Human Trafficking'}},//
	sex_trafficking:{title:'Sex Trafficking',  params:{category:'Sex Trafficking'}},//

	//housing 
	shelter: {title: "Shelter", params:{ keyword:'shelter'}},
	affordable_housing: {title: "Affordable Housing", params:{category:'Affordable Housing'}},
	transitional_housing: {title: "Transitional Housing", params:{category:'transitional_housing'}},
	supportive_Housing: {title: "Permanent Supportive Housing", params:{category:'Permanent Supportive Housing'}},
	
	//food
	meals :{title: "Hot Meals", params:{lat_lng:'_', category:'Hot Meals'}},
	food_closets :{title: "Food Closets",  params:{category:'Food Pantries'}},
	wic :{title: "WIC",  params:{category:'WIC'}},
	ebt_food :{title: "EBT Food", params:{category:'EBT Food',lat_lng:'_', org_name:'ebt'}},   //
	ebt_restaurant :{title: "EBT Restaurant", params:{keyword:'EBT REstaurant',lat_lng:'_', org_name:'ebt'}},   //
	ebt_cash :{title: "EBT Cash", params:{category:'EBT Cash',lat_lng:'_', org_name:'ebt'}},   //
	
	//healthcare
	clinics:{title: 'Community Clinics', params:{category:'Community Clinics'}},
	immunization:{title: 'Immunization', params:{category:'Immunization'}},
	std:{title: 'STD Testing and Treatment', params:{category:'STD Testing and Treatment'}},
		
	//mental health
	amental_health: {title: "Adult Mental Health", params:{category:'Adult Mental Health'}},//
	cmental_health: {title: "Children's Mental Health", params:{category:"Children\'s Mental Health"}},//
	substance_use: {title: "Substance Use", params:{category:'Substance Use'}},	
	crisis:{title:'Crisis Support',  params:{category:'Crisis Support'}},
	groups:{title:'Support Groups',  params:{category:'Support Groups'}},
	
	legal: {title: "Legal Services", params:{category:'Legal Services'}},
	
	employment:{title:"Employment", params:{keyword:'employment'}},
	
	vocational: {title: "Vocational", params:{category:'Vocational'}},
	school_districts: {title: "School Districts", params:{category:'School Districts'}},
	colleges: {title: "Community Colleges", params:{category:'Community Colleges'}}	
	
  } ;
  
  $scope.currentCategory='';
  
  $scope.allListings=true;
  
  $scope.onItemClicked = function (resource) {
    DataService.resourceClicked(resource);
  }
  
  $scope.resources = {};
  $scope.markers = {};
  
  
  hrApp.fw7.app.onPageInit('indexPage', function(page) { 
	  initScope(page);
  });
  hrApp.fw7.app.onPageReinit('indexPage', function(page) { 
	  initScope(page);
   });
  

  
    function initScope(page){
    	var myLatLng = GMapService.myLatLng;
    	
    	if(globalCat=='' && globalKeyword =='')
    		return;
    	
    	if($scope.currentCategory == globalCat && globalCat != 'search')
    		return;
    	$scope.currentCategory = globalCat;
    	
    	// call google analytics
    	ga('set', 'page', globalCat + '.html');
    	ga('send', 'pageview');
    	
    	$scope.resources = {}; // the ordered (by distance) list of locations 
    	//$scope.markers = {};
    	$scope.page = pages[globalCat];
   	  	$rootScope.title = $scope.page.title;
   	  	
   	  	var params = $scope.page.params;
   	  	if(params.lat_lng )
   	  		params.lat_lng = myLatLng.lat+','+myLatLng.lng;
   	  	if(params.keyword && globalKeyword != '') //&& params.keyword == '_')
   	  		params.keyword = globalKeyword;
   	  	
   	  	getResourceData(params); 
   	    if(globalKeyword !=''){
   	    	$rootScope.title = '"'+globalKeyword+'"';
   	    	globalKeyword =''; //reset the search
   	    }
    }
  
  
	function getResourceData(params){
		
		var myLatLng = GMapService.myLatLng;
		//console.log('keyword: '+$scope.page.keyword);
	    DataService.getLocations(params)  //$scope.page.category, myLatLng, globalKeyword)
	    	.then(function (result) {	    		
	    		//$scope.resources = angular.fromJson(result.data);
	    		var locations = angular.fromJson(result.data);
	    		locations= orderByDistance(locations, myLatLng);
	    		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    		var labelIndex = 0;
	    		GMapService.initMap('google-map1');
	    		
	    		var idList =[];
	    		
	    		for(var idx in locations){		    		
	    			var r= locations[idx];
	    			var locationId= 'loc'+r.id;
	    			if($scope.resources[locationId]){
	    				console.log('duplicate '+locationId);
	    				continue;
	    			}
	    			idList.push(r.id);
	    			
	    			// save the markers and distances in a separate array, since the locations are overwritten
	    			if(idx < 26 && angular.isNumber(r.latitude) && angular.isNumber(r.latitude)){
	    				var label = labels[labelIndex++ % labels.length];	    				
	    				var m = GMapService.placeMarker(r.latitude,r.longitude, label)
	    				//$scope.markers[r.id]= {label: '('+label+')', distance:r.distance, marker: m };
	    				r.label= '('+label+')';
	    		    }
	    			//else
	    				
	    		    	//$scope.markers[r.id]= {label: '', distance:r.distance };
	    			
	    			console.log('received: '+idx +' '+r.id);
	    			$scope.resources['loc'+r.id]= r; // prepended 'loc' to the number to keep it sorted in the same order
	    			DataService.getDetailInfo(r.id, $scope.resources);
	    		}
	    		DataService.getRatings(idList);
	    	}, 
	    	function (err) {
	    		console.error('error getting data '+err);
	    	}    	);
	    
	}
	
	function orderByDistance(locations, myLoc){
		var myLat= myLoc.lat;
		var myLng = myLoc.lng;
		//console.log('mylat: '+myLat+'  mylong: '+myLng)
		var unlocs=[];
		for(var idx in locations){		    		
			var r= locations[idx];	
			if(angular.isNumber(r.latitude) ){
				var deltaLat = Math.abs(r.latitude - myLat) * 68; //62.5; //1/0.016;
				var deltaLng = Math.abs(r.longitude - myLng) * 57; //52.6; //1/0.019;
				//console.log(r.id +' dlat: '+deltaLat +'   dlng: '+deltaLng);
				r.distance= Math.round(Math.pow(Math.pow(deltaLat,2) + Math.pow(deltaLng,2), 0.5) *10)/10;
			}
			else
				r.distance = 0; // listings without latitude get distance =0, so they go on top
			unlocs.push(r); 			
		}
		var olocs = unlocs.sort(function(a, b) {
		        return ((a.distance < b.distance) ? -1 : 1);
		    });
		return olocs;
	}
	
	/*
	function getResourceDetails(resource){
		DataService.getDetailInfo(resource.id)
    	.then(function (result) {
    		var resource = extractSchedule(result.data);
    		resource.description = fixPhoneNumber(resource.description);
    		$scope.resources[resource.id] = resource;
    		console.log(result.data);
    	});
		
	}
	*/
	
	
	
}]);