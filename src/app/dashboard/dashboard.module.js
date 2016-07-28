'use strict';

angular.module('sputnikApp.dashboard', [])

.config(function ($routeProvider) {

    if (window.isMobile) {
        
        $routeProvider.when('/dashboard/:category?', {
            templateUrl: '/app/dashboard/dashboard-mobile.tpl.html',
            controller: 'DashboardMobileCtrl',
            resolve: {
                mustAuth: ['RouteService', function(RouteService) {
                    RouteService.mustAuth('/');
                }]
            }
        });

    } else {

        $routeProvider.when('/dashboard', {
            templateUrl: '/app/dashboard/dashboard.tpl.html',
            controller: 'DashboardCtrl',
            resolve: {
                mustAuth: ['RouteService', function(RouteService) {
                    RouteService.mustAuth('/');
                }]
            }
        });

    }

});