'use strict';

describe('Controller: HomeCtrl', function() {

    var HomeCtrl;
    var scope;

    beforeEach(function() {
        module('sputnikApp');

        inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            HomeCtrl = $controller('HomeCtrl', {
                $scope: scope
            });
        });

    });
    
});
