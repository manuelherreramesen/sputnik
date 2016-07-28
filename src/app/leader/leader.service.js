'use strict';

angular.module('sputnikApp.leader').service('LeaderService', function($http, $q, $angularCacheFactory, ENV) {

    var cache = $angularCacheFactory('leaderService');
    //var fieldAddedTMP = '/26';
    var self = {

        leaders: {
            entries: []
        },

        fetchAll: function() {

            if (self.leaders.entries.length === 0) {
				
                return $http({
                    method: 'GET',
                    url: ENV.apiEndpoint + '/games/leaderboard',
                    data: {},
                    cache: cache
                }).then(function(response) {
                    angular.copy(response.data, self.leaders);
                    return self.leaders;
                });

            }

            var d = $q.defer();
            d.resolve(self.leaders);
            return d.promise;

        }
        
    };

    return self;
});