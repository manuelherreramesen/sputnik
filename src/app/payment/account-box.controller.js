'use strict';

angular.module('sputnikApp.payment').controller('AccountBoxCtrl', function($scope, $filter, $modal, UserService, PaymentService) {

    $scope.user = UserService.identity;

    $scope.process = {
        selected: {},
        rates: {
            realRate: 0,
            bonusRate: 0
        },
        amount: UserService.identity.wallet.creditsBalance,
        options: [{
            label: $filter('translate')('Bonus'),
            value: 'BONUS_MONEY'
        }, {
            label: $filter('translate')('Cash'),
            value: 'REAL_MONEY'
        }]
    };
    $scope.process.selected = $scope.process.options[0];

    PaymentService.getConversionRates().then(function (rates) {
        $scope.process.rates = rates;
        if ($scope.process.rates.realRate === 0) {
            $scope.process.options = _.without($scope.process.options, _.findWhere($scope.process.options, {value: 'REAL_MONEY'}));
            $scope.process.selected = _.findWhere($scope.process.options, {value: 'BONUS_MONEY'});
        }
    });

    $scope.convert = function() {
        var scope = $scope.$new(false);
        var modal = $modal({
            scope: scope,
            template: '/app/payment/bling-conversion.tpl.html',
            show: false
        });
        modal.$promise.then(modal.show);
    };
    $scope.changeAmount = function() {
        if ($scope.process.amount > UserService.identity.wallet.creditsBalance) {
            $scope.process.amount = UserService.identity.wallet.creditsBalance;
        }
    };

});
