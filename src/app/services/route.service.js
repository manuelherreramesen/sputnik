'use strict';

angular.module('sputnikApp').service('RouteService', function($rootScope, $q, $location, UserService) {
    
    var self = {

        mustAuth: function(redirectTo) {

            var authDeferred = $q.defer();

            UserService.load().then(function (user) {

                if (!angular.isNumber(user.id)) {

                    $location.url(redirectTo);
                    authDeferred.reject();

                } else {

                    authDeferred.resolve();

                }

            });

            return authDeferred.promise;
        }

    };

    return self;
});