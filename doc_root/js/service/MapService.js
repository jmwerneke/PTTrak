 //var myLatLng = {lat: 38.575, lng: -121.485}; center of sac
//api key: AIzaSyC3ays483Ixy2Gr76BAvjGZBrls4j6ZOUI     AIzaSyC3ays483Ixy2Gr76BAvjGZBrls4j6ZOUI

hrApp.angular.factory('MapService', ['$document', function ($document) {
  'use strict';

  var pub = {};

       function initMap() {
			  var myLatLng = {lat: 38.575, lng: -121.485};
			
			  // Create a map object and specify the DOM element for display.
			  var map = new google.maps.Map(document.getElementById('map'), {
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
       
	
       hrApp.onPageReInit('indexPage', function(page) { 
       	console.log('map page initialized'); 
       	function initialize() {
       		// define function 
       		var mapProp = { center: new google.maps.LatLng(51.508742, -0.120850), zoom: 5, mapTypeId: google.maps.MapTypeId.ROADMAP }; 
       		var map = new google.maps.Map(document.getElementById('googleMap'), mapProp); 
       	} 
       	initialize();   // run function 
	    });
	
function initMapGC(){
	console.log('google called me back!'); 
}


return pub;

}]);
