/*jslint browser: true*/
/*global console, hrApp, angular, Framework7*/

// Init angular
var hrApp = {};

hrApp.config = {
};

hrApp.angular = angular.module('hrApp', []);

hrApp.fw7 = {
  app : new Framework7({
    animateNavBackIcon: true
  }),
  options : {
    dynamicNavbar: true,
    domCache: true
  },
  views : []
};

// this does NOT get called !!
hrApp.fw7.app.onPageReinit('indexPage', function(page){
	    console.log(' onPageReinit !');
	}		
);


hrApp.angular.directive("googleMap",function(){
	return {
		template:'<div>google map goes here</div>',
		replace:true,
		link:function(scope, element,attrs){
			  var myLatLng = {lat: 38.575, lng: -121.485};
			
			  // Create a map object and specify the DOM element for display.
			  var map = new google.maps.Map(document.getElementById('google-map1'), {
			    center: myLatLng,
			    scrollwheel: false,
			    zoom: 12
			  });
			
			  // Create a marker and set its position.
			  var marker = new google.maps.Marker({
			    map: map,
			    position: myLatLng,
			    title: 'this is you'
			  });
			  
		}
	};
});

