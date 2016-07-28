'use strict';

angular.module('sputnikApp.showroom').controller('ShowroomCtrl', function($scope, $modal, ShowroomService) {

	$scope.ui = {
		visiblePopover: ''
	};

	$scope.togglePopover = function(name) {
		if ($scope.ui.visiblePopover === name) {
			$scope.ui.visiblePopover = '';
			return;
		}
		$scope.ui.visiblePopover = name;
	};
    
    if (!ShowroomService.isPlayerAnnoyed()) {
        var modal = $modal({
            template: '/app/showroom/information.tpl.html',
            show: false
        });
        modal.$promise.then(modal.show);
	}

});
