'use strict';

angular.module('sputnikApp').controller('VerifyCtrl', function($scope, $routeParams, UserService) {

    // Force three steps to show full completed steps
    $scope.ui = {
        step: 4,
        loading: true,
        correctCode: true
    };

    UserService.verifyEmail($routeParams.code).then(function() {
        $scope.ui.correctCode = true;
    }).catch(function() {
        $scope.ui.correctCode = false;
    }).finally(function() {
        $scope.ui.loading = false;
    });

});