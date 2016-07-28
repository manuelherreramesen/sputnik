'use strict';

angular.module('sputnikApp.leader', [])

.config(function($routeProvider) {
    $routeProvider
        .when('/the-penthouse', {
            templateUrl: '/app/leader/leaders.tpl.html',
            controller: 'LeadersCtrl'
        });
});