'use strict';

angular.module('sputnikApp.story', [])

.config(function($routeProvider) {

    $routeProvider
        .when('/story/items', {
            templateUrl: '/app/story/items.tpl.html',
            controller: 'ItemsCtrl',
            resolve: {
                mustAuth: ['RouteService', function(RouteService) {
                    RouteService.mustAuth('/');
                }]
            }
        })
        .when('/story/history', {
            templateUrl: '/app/story/history.tpl.html',
            controller: 'HistoryCtrl',
            resolve: {
                mustAuth: ['RouteService', function(RouteService) {
                    RouteService.mustAuth('/');
                }]
            }
        })
        .when('/story/settings', {
            templateUrl: '/app/story/settings.tpl.html',
            controller: 'SettingsCtrl',
            resolve: {
                mustAuth: ['RouteService', function(RouteService) {
                    RouteService.mustAuth('/');
                }]
            }
        });

});