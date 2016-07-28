'use strict';

angular.module('sputnikApp.showroom', [])

.config(function($routeProvider) {

    $routeProvider
        .when('/bling-avenue', {
            templateUrl: '/app/showroom/showroom.tpl.html',
            controller: 'ShowroomCtrl'
        });

});
