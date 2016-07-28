'use strict';

angular.module('sputnikApp.payment').controller('BlingConversionCtrl', function ($scope, $modal, UserService, PaymentService) {

    $scope.user = UserService.identity;

    $scope.close = function () {
        $scope.$hide();
    };

    $scope.confirm = function () {
        $scope.process.thinking = true;
        PaymentService.convertCredits($scope.process.amount, $scope.process.selected.value).then(function (data) {
            $scope.user.wallet = data;
            $scope.process.amount = data.creditsBalance;
        }).finally(function () {
            $scope.process.thinking = false;
        });
        $scope.close();
    };

});
