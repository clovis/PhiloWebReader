var app = angular.module('PhiloReaderApp', ['ngMaterial', 'ngAnimate']);

app.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('blue');
});

app.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

app.controller('AppCtrl', ['$rootScope', '$http', '$mdSidenav', function($rootScope, $http, $mdSidenav) {
	
	var vm = this;
	
	vm.mainView = 'landing';
	
	vm.goToTableOfContents = function(item) {
		var philoID = item.philo_id.join(' ');
		$http.get('http://pantagruel.ci.uchicago.edu/philologic4/shakespeare/reports/table_of_contents.py?philo_id=' + philoID).then(function(response) {
			vm.tableOfContents = response.data.toc;
			vm.currentTitle = response.data.citation.title.label;
		});
	}
	
	vm.getText = function(item) {
		$http.get('http://pantagruel.ci.uchicago.edu/philologic4/shakespeare/reports/navigation.py?philo_id=' + item.philo_id).then(function(response) {
			vm.text = response.data.text;
			vm.currentTitle = response.data.citation.title.label;
			vm.mainView = 'text';
		});
	}
	
	vm.returnHome = function() {
		vm.mainView = 'landing';
	}
	
	vm.openLeftMenu = function() {
		$mdSidenav('left').toggle();
	};
 
}]);

app.controller('landingPage', ['$http', function($http) {
	
	var vm = this;
	
	$http.get('http://pantagruel.ci.uchicago.edu/philologic4/shakespeare/reports/bibliography.py').then(function(response) {
		vm.bibliography = response.data.results;
	});
	
}]);
