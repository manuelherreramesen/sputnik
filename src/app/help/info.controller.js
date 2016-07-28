'use strict';

angular.module('sputnikApp.help').controller('InfoCtrl', function($scope, $routeParams, $anchorScroll) {
	$scope.category = $routeParams.category;

	if (typeof $routeParams.section !== 'undefined') {
		$anchorScroll($routeParams.section);
	}

});