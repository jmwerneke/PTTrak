/*jslint browser: true*/
/*global console, Framework7, hrApp*/

hrApp.angular.factory('DataService', ['$http', function ($http) {
  'use strict';

  var pub = {},
    eventListeners = {
      'resourceClicked' : []
     ,'commentClicked' : []
    };
  
  pub.addEventListener = function (eventName, callback) {
    eventListeners[eventName].push(callback);
  };
  
  pub.resourceClicked = function (resource) {
    for (var i=0; i<eventListeners.resourceClicked.length; i++) {
      eventListeners.resourceClicked[i](resource);
    }
  };
  
  pub.commentClicked = function (resource) {
	    for (var i=0; i<eventListeners.commentClicked.length; i++) {
	      eventListeners.commentClicked[i](resource);
	    }
 };
  
 
 pub.getComments = function(resource_id, resource_type){
	 return $http.get('get.php?table=comments&resource_id='+ resource_id + '&resource_type='+resource_type);
 };
 // http://api.helphubsac.org/api/search?action=index&controller=locations&keyword=meal&location=95831&org_name=&radius=2
 //http://api.helphubsac.org/api/search?category=Youth
 //http://api.helphubsac.org/api/locations/loaves-fishes
 //http://api.helphubsac.org/api/organizations
 	pub.getLocations = function (params) {
    	 
 	var queryString='';
	for(var key in params){
		queryString +='&'+ key + '=' + params[key];
	}
	queryString = encodeURI(queryString.substr(1));
	 
	console.log(queryString);	  	  
	return $http({
	        url: 'http://api.helphubsac.org/api/search?'+ queryString,
	        method: "GET",
	        withCredentials: true,
	        headers: { 'Content-Type': 'application/json; charset=utf-8' }
	    });	  	  
  };
  
  pub.getDetailInfo = function(slug){
	  //http://api.helphubsac.org/api/locations/weave
	  return $http({
	        url: 'http://api.helphubsac.org/api/locations/'+ slug,
	        method: "GET",
	        withCredentials: true,
	        headers: { 'Content-Type': 'application/json; charset=utf-8'  }
	    });	  
  }
  
//======================================================  local storage
  
  pub.getFavorites = function(){
	  if(typeof(Storage) == "undefined") {
		  console.log("local storage not supported");
		  return;
	  }
	  var favorites = localStorage.getItem("favorites");
	  if(! favorites )
		  favorites = [];
	  else
		  favorites = angular.fromJson(favorites);
	  return favorites; 
  }
  
  pub.addToFavorites= function(resource){
	  var slug = resource.slug;
	  
	  if(typeof(Storage) == "undefined") {
		  return;
	  }
	  
	  var favorites = localStorage.getItem("favorites");
	  if(! favorites)
		  favorites = [slug];
	  else{
		  favorites = angular.fromJson(favorites);
		  if(favorites.indexOf(slug) == -1)
		  	favorites.push(slug);
  	  }
	  localStorage.setItem("favorites", angular.toJson(favorites));	  
  }
  
  pub.removeFromFavorites= function(resource){
	  var slug = resource.slug;
	  if(typeof(Storage) == "undefined") {
		    // Code for localStorage/sessionStorage.
		  console.log("local storage not supported");
		  return;
	  }
	  
	  var favorites = localStorage.getItem("favorites");
	  if(! favorites)
		  return;
	  else
		  favorites = angular.fromJson(favorites);
	  
	  var newFavorites = favorites.filter(function(e){return e!== slug })
	  
	  localStorage.setItem("favorites", angular.toJson(newFavorites));
	  
  }
//======================================================  local storage
  
  
  return pub;
  
}]);


//======================================================  local storage





//======================================================
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
