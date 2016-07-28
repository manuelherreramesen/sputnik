'use strict';

angular.module('sputnikApp.help', [])

.config(function ($routeProvider) {

    $routeProvider
        .when('/info/terms-and-conditions/:section', {
            templateUrl: '/app/help/info.tpl.html',
            controller: 'InfoCtrl',
            resolve: {
                routeParams: ['$route', '$q', function($route, $q) {
                    $route.current.params.category = 'terms-and-conditions';
                    var d = $q.defer();
                    return d.resolve();
                }]
            }
        })
        .when('/info/:category', {
            templateUrl: '/app/help/info.tpl.html',
            controller: 'InfoCtrl'
        });

});