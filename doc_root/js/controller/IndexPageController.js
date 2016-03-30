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
	  $scope.page = pages[category];
	  $rootScope.title = $scope.page.title;
     	console.log('onPageInit2 with: '+ category); 	       	
 		getKitchenData();   // run function 
  });
  hrApp.fw7.app.onPageReinit('indexPage', function(page) { 
	  $scope.page = pages[category];
	  $rootScope.title = $scope.page.title;
   	  console.log('onPageReInit2 with: '+ category); 	  	       	
	  getKitchenData();   // run function 
   });
  
 /*InitService.addEventListener('ready', function () {
	});
*/
  
	function getKitchenData(){
		console.log('keyword: '+$scope.page.keyword);
	    DataService.getLocations($scope.page.keyword,2)
	    	.then(function (result) {	    		
	    		$scope.kitchens = angular.fromJson(result.data);
	    		//console.log($scope);
	    		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	    		var labelIndex = 0;
	    		GMapService.initMap('google-map1');
	    		for(var idx in $scope.kitchens){
	    			var r= $scope.kitchens[idx];
	    			if(angular.isNumber(r.latitude) && angular.isNumber(r.latitude)){
	    				var label = labels[labelIndex++ % labels.length];
	    				$scope.kitchens[idx].label = label;
	    				r.marker= GMapService.placeMarker(r.latitude,r.longitude, label);
	    				//console.log("adding marker for " + r.name);
	    		    }   			
	    		}
	    	}, 
	    	function (err) {
	    		console.error('error getting data '+err);
	    	}    	);
	    
	}
  
}]);