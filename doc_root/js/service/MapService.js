 //var myLatLng = {lat: 38.575, lng: -121.485}; center of sac
//api key: AIzaSyC3ays483Ixy2Gr76BAvjGZBrls4j6ZOUI     AIzaSyC3ays483Ixy2Gr76BAvjGZBrls4j6ZOUI

hrApp.angular.factory('GMapService', function () {
  'use strict';

  var pub = {
		  gmap:null,
		  myLatLng: {lat: 38.575, lng: -121.485}
  };
  
  function updateMap(mypos){
	  pub.myLatLng.lat = mypos.coords.latitude;
      pub.myLatLng.lng = mypos.coords.longitude;
      //console.log(pub.myLatLng);
      
   //   pub.gmap.panTo(pub.myLatLng);
   //   pub.placeMarker(pub.myLatLng.lat, pub.myLatLng.lng)
  }
  
  pub.placeMarker = function(lat, lng, label)
  {
	  var marker = new google.maps.Marker({
		    map: pub.gmap,
		    position: {lat: lat, lng: lng},
	  		label: label
		  //  ,title: 'this is you'
		  });
	  return marker;
  };  
  
  pub.initMap = function (mapDivId) {
  // function initMap(mapDivId) {
		 console.log('map  Initialized'); 
		 /*pub.myLatLng = {lat: 38.575, lng: -121.485};
		 if (navigator.geolocation) {
		      navigator.geolocation.getCurrentPosition(updateMap);		       
		  }
		  */
		  // Create a map object and specify the DOM element for display.
		  pub.gmap = new google.maps.Map(document.getElementById(mapDivId), {
		    center: pub.myLatLng,
		    scrollwheel: false,
		    mapTypeControl: false,
		    zoomControl:false,
		    streetViewControl: false,
		    zoom: 13   //14
		  });
		
	}
    /*   
       function initMapGC(){
    		console.log('google called me back!'); 
       }
	*/
       
   // Init
   function initService(){
	   if (navigator.geolocation) {
		      navigator.geolocation.getCurrentPosition(updateMap);		       
		  }
	   /*
       hrApp.fw7.app.onPageInit('indexPage', function(page) { 
	       	console.log('onPageInit'); 	       	
       		initMap('google-map1');   // run function 
	    });
	    */
   }	
  
   initService();
   
   return pub;

});
