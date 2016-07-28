'use strict';

angular.module('sputnikApp.promotion', [])

.config(function ($routeProvider) {

    $routeProvider
        .when('/promotions', {
            templateUrl: '/app/promotion/promotions.tpl.html',
            controller: 'PromotionsCtrl'
        })
        .when('/promotions/:id', {
            templateUrl: '/app/promotion/view.tpl.html',
            controller: 'ViewCtrl',
            resolve: {
                promotion: ['$route', 'PromotionService', function($route, PromotionService) {
                    return PromotionService.fetch($route.current.params.id);
                }]
            }
        })
        .when('/bonus-code/:id', {
            templateUrl: '/app/promotion/bonus-code.tpl.html',
            controller: 'BonusCodeCtrl'
        });

});