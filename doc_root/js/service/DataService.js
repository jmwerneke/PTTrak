/*jslint browser: true*/
/*global console, Framework7, hrApp*/

hrApp.angular.factory('DataService', ['$http', function ($http) {
  'use strict';

  var pub = {},
    eventListeners = {
      'kitchenClicked' : []
     ,'commentClicked' : []
    };
  
  pub.addEventListener = function (eventName, callback) {
    eventListeners[eventName].push(callback);
  };
  
  pub.kitchenClicked = function (kitchen) {
    for (var i=0; i<eventListeners.kitchenClicked.length; i++) {
      eventListeners.kitchenClicked[i](kitchen);
    }
  };
  
  pub.commentClicked = function (resource) {
	    for (var i=0; i<eventListeners.resourceClicked.length; i++) {
	      eventListeners.commentClicked[i](resource);
	    }
 };
  
 
 
  pub.getKitchens = function () {
    return $http.get('kitchens.json');
  };
  
  return pub;
  
}]);


///filter
hrApp.angular.filter('openFilter', function() {
	    return function(items, openToday) {
	    	/*
	        var i, c, txt = "";
	        x = x.split("")
	        for (i = 0; i < x.length; i++) {
	            c = x[i];
	            if (i % 2 == 0) {
	                c = c.toUpperCase();
	            }
	            txt += c;
	        }
	        return txt;
	        */
	/*    	
	    	if(openToday){
	    		var ret=[];
	    		var idx=0;
	    		for(var i in items){
	    			if(idx++ <2)
	    				ret.push(i);
	    		}
	    		return ret;
	    	}
	    	else */
	    		return items;
	    };
});
