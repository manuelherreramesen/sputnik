'use strict';

angular.module('sputnikApp.payment', [])

.directive('formSubmitDirective', function($timeout) {
    return function(scope) {
        if (scope.$last){
            $timeout(function () {
                iFrameForm.submit();
            });

        }
    };
})

.directive('appendHtml', function () {
    return function (scope, element, attrs) {
        scope.AppendHtml(element);
    };
})

.config(function($routeProvider) {
    $routeProvider
        .when('/bonuses/:status?', {
            templateUrl: '/app/payment/bonuses.tpl.html',
            controller: 'BonusesCtrl',
            resolve: {
                mustAuth: ['RouteService', function(RouteService) {
                    RouteService.mustAuth('/');
                }]
            }
        })
        .when('/deposit/:status?', {
            templateUrl: '/app/payment/deposit/deposit.tpl.html',
            controller: 'DepositCtrl',
            resolve: {
                mustAuth: ['RouteService', function(RouteService) {
                    RouteService.mustAuth('/');
                }]
            }
        })
        .when('/withdrawal', {
            templateUrl: '/app/payment/withdrawal/withdrawal.tpl.html',
            controller: 'WithdrawalCtrl',
            resolve: {
                mustAuth: ['RouteService', function(RouteService) {
                    RouteService.mustAuth('/');
                }]
            }
        })
        .when('/transaction-history', {
            templateUrl: '/app/payment/transaction-history.tpl.html',
            controller: 'TransactionHistoryCtrl',
            resolve: {
                mustAuth: ['RouteService', function(RouteService) {
                    RouteService.mustAuth('/');
                }]
            }
        });
});