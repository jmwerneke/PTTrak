/*jslint browser: true*/
/*global console, hrApp*/

hrApp.angular.controller('FrontPageController', ['$scope', '$http', 'InitService', 'DataService', function ($scope, $http, InitService, DataService) {
  'use strict';
  
  $scope.search_text ='';
  
  $scope.onSearch = function () {
	  	globalCat     = 'search';
	  	globalKeyword = $scope.search_text;
	    // goto the index page
	  	hrApp.fw7.views[0].router.load({pageName: 'indexPage'});
  }
  
  $scope.globalPanel = function(div)  {
	  Dom7('.paneldiv').hide();
	  Dom7('#'+div).show();
  }
  
 
  
}]);