'use strict';

angular.module('sputnikApp.showroom').controller('InformationCtrl', function($scope, $modal, ShowroomService) {

    $scope.ui = {
        annoyed: false
    };

    $scope.close = function() {
        ShowroomService.setAnnoyed($scope.ui.annoyed);
        $scope.$hide();
    };

});
