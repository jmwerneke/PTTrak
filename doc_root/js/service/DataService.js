/*jslint browser: true*/
/*global console, Framework7, hrApp*/

hrApp.angular.factory('DataService', ['$http', function ($http) {
  'use strict';

  var locationCache ={};
  
  var pub = {},
    eventListeners = {
      'resourceClicked' : []
     ,'reviewClicked' : []
    };
  
  pub.addEventListener = function (eventName, callback) {
    eventListeners[eventName].push(callback);
  };
  
  pub.resourceClicked = function (resource) {
    for (var i=0; i<eventListeners.resourceClicked.length; i++) {
      eventListeners.resourceClicked[i](resource);
    }
  };
  
  pub.reviewClicked = function (resource) {
	    for (var i=0; i<eventListeners.reviewClicked.length; i++) {
	      eventListeners.reviewClicked[i](resource);
	    }
 };
  
 
 pub.getReviews = function(resource_id, resource_type){
	 return $http.get('get.php?table=reviews&resource_id='+ resource_id + '&resource_type='+resource_type);
 };
 
 
 // http://api.helphubsac.org/api/search?action=index&controller=locations&keyword=meal&location=95831&org_name=&radius=2
 //http://api.sacsos.org/api/search?category=EBT+Food
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
		        url: 'http://api.sacsos.org/api/search?'+ queryString,
		        method: "GET",
		        withCredentials: true,
		        headers: { 'Content-Type': 'application/json; charset=utf-8' }
		    });	  	  
  };
  
  
  pub.getRatings = function(idList){		  
	  var l= $http.get('get.php?table=ratings&ids='+ idList )
	  		.then(function (result) {
	  			var ratings = result.data.ratings;
	  			console.log('locatins cache');
	  			console.log(locationCache);
	  			if(ratings){
		  			for(var idx in ratings){
		  				var rating = ratings[idx]; 		
		  				console.log('location-id '+rating.location_id +'   rating '+rating.rating);
		  				var locationId = 'loc'+rating.location_id;
		  				var resource = locationCache[locationId];
		  				resource.rating = rating.rating;	    	
		  			}
	  			}
	  		});    
  }
  
  /*
  pub.getDetailInfo = function(id){
	  return $http({
	        url: 'http://api.helphubsac.org/api/locations/'+ id,
	        method: "GET",
	        withCredentials: true,
	        headers: { 'Content-Type': 'application/json; charset=utf-8'  }
	    });	  
  }
  */
  
  
  // helphubsac
  pub.getDetailInfo = function(id, resourceList){
	  var locationId = 'loc'+id;
	  if(locationCache[locationId]){
		  //console.log("get "+id + " from cache !!!!!");
		  var r = locationCache[locationId];
		  var oldResource = resourceList[locationId];
		  if(oldResource){
			  r.label = oldResource.label;  // label changes with every search
		  }
		  resourceList[locationId]= r;
	  }
	  locationCache[locationId] =resourceList[locationId];
	  //console.log("get "+id + " from server");
	  var l= $http({
		        url: 'http://api.sacsos.org/api/locations/'+ id,
		        method: "GET",
		        withCredentials: true,
		        headers: { 'Content-Type': 'application/json; charset=utf-8'  }
	    	}).then(function (result) {
	    		    var r = result.data;
	    			r = extractSchedule(r);
	    			r.description = fixPhoneNumber(r.description);
	    			//r.rating= Math.round(Math.random()*5);
	    			
	    			var oldResource = resourceList[locationId]; // copy data that was added to the old resource before we overwrite it
	    			if(oldResource){
		    			if(oldResource.distance) r.distance= oldResource.distance;
		    			if(oldResource.label) r.label = oldResource.label;
		    			if(oldResource.rating)r.rating = oldResource.rating;
	    			}
	    			resourceList[locationId] = r;
			    	locationCache[locationId]= r; // store it in the cache			    	
	        	});
	      
  }
  
  function extractSchedule(resource)
	{
		var weekdays= ['Sun ','Mon ','Tue ','Wed ','Thu ','Fri ','Sat ','Sun '];
		var schedules = resource.regular_schedules;
		if(!schedules)
			return resource;
		
		var today = new Date(); 
		today= today.getDay();
		
		var days= [];
		var open_today= '';
		
		for(var idx in schedules){
			var s = schedules[idx];
			if(s.weekday == today){				
				var closes = s.closes_at.substr(11,2);
				if(closes >12)
					closes = (closes -12 )+' PM';
				open_today += s.opens_at.substr(11,2) +' to '+ closes + ' ';
			}
			if(days.indexOf(s.weekday) == -1)
				days.push(s.weekday);
		}
		var open_days='';
		for(var idx in days)
			open_days += weekdays[days[idx]];
		
		resource.open_days = open_days;
		resource.open_today = open_today; 
		
		// check for hotlines
		for(var idx in resource.phones){
			var s = resource.phones[idx];
			if(s.number_type == 'hotline'){
				resource.open_today = " Hotline: "+s.number;
			}
		}
		
		
		
		return resource;
	}
	
	function fixPhoneNumber(str){
		var patt = /\(?(\d{3})\)?[ -\.](\d{3})[ -\.](\d{4})/ig ;
		var repl = "<a href='tel:($1) $2-$3' class='external' >($1) $2-$3</a>";		
		return str.replace(patt, repl);
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
	  var id = resource.id;
	  resource.isfavorite= true;
	  
	  if(typeof(Storage) == "undefined") {
		  return;
	  }
	  
	  var favorites = localStorage.getItem("favorites");
	  if(! favorites)
		  favorites = [id];
	  else{
		  favorites = angular.fromJson(favorites);
		  if(favorites.indexOf(id) == -1)
		  	favorites.push(id);
  	  }
	  localStorage.setItem("favorites", angular.toJson(favorites));	  
  }
  
  pub.removeFromFavorites= function(resource){
	  resource.isFavorite= false;
	  var id = resource.id;
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
	  
	  var newFavorites = favorites.filter(function(e){return e!== id })
	  
	  localStorage.setItem("favorites", angular.toJson(newFavorites));
	  
  }
//======================================================  local storage
  
  
  return pub;
  
}]);


/* cant do html 
hrApp.angular.filter('myFilter', function() {
	return function(rating) {
		var out='<i class="fa fa-star"></i>';
			if(!rating)
				return 'not rated';
			while(rating-- > 0)
				out +='<i class="fa fa-star"></i>';
		 return out;
    };
});
*/

