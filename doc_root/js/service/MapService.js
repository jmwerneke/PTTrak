 //var myLatLng = {lat: 38.575, lng: -121.485}; center of sac
//api key: AIzaSyC3ays483Ixy2Gr76BAvjGZBrls4j6ZOUI     AIzaSyC3ays483Ixy2Gr76BAvjGZBrls4j6ZOUI

hrApp.angular.factory('GMapService', function () {
  'use strict';

  var pub = {};
  
   function initMap(mapDivId) {
		 console.log('map  Initialized'); 
		  var myLatLng = {lat: 38.575, lng: -121.485};
		
		  // Create a map object and specify the DOM element for display.
		  var map = new google.maps.Map(document.getElementById(mapDivId), {
		    center: myLatLng,
		    scrollwheel: false,
		    zoom: 14
		  });
		
		  // Create a marker and set its position.
		  var marker = new google.maps.Marker({
		    map: map,
		    position: myLatLng,
		    title: 'this is you'
		  });
		
	}
    /*   
       function initMapGC(){
    		console.log('google called me back!'); 
       }
	*/
       
   // Init
   function initService(){
       hrApp.fw7.app.onPageInit('indexPage', function(page) { 
	       	console.log('onPageInit'); 	       	
       		initMap('google-map1');   // run function 
	    });
   }	
  
   initService();
   return pub;

});
