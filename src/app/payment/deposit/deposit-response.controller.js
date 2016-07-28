'use strict';

angular.module('sputnikApp.payment').controller('DepositResponseCtrl', function($scope, $routeParams) {

    $scope.request = {
        merchantReference: $routeParams.merchantReference,
        pspReference: $routeParams.pspReference
    };

    $scope.sendDepositInformation = function() {
        console.log($scope.request.merchantReference);
        console.log($scope.request.pspReference);
    };

});