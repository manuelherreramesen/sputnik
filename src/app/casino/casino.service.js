'use strict';

angular.module('sputnikApp.casino').service('CasinoService', function($http, $angularCacheFactory, ENV, UserService) {

    var cache = $angularCacheFactory('casinoService');

    var self = {

        fetchAll: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/games',
                data: {},
                cache: cache
            }).then(function(response) {
                return response.data.categories;
            });
        },

        fetchAllTouch: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/games/touch',
                data: {},
                cache: cache
            }).then(function(response) {
                return response.data.categories;
            });
        },

        fetchFreeRounds: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/bonuses/freeround',
                data: {}
            }).then(function(response) {
                return response.data.gameName;
            });
        },

        createSession: function(id) {
            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/games',
                data: {
                    playerId: UserService.identity.id,
                    gameId: id
                }
            }).then(function(response) {
                var data = response.data;
                // Add missing data to the flashvars
                data.flashVars = data.flashVars + '&sessid=' + data.sessionId + '&server=' + ENV.netentServer;
                return data;
            });
        },

        createTouchSession: function(id) {
            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/games/touch',
                data: {
                    playerId: UserService.identity.id,
                    gameId: id
                }
            }).then(function(response) {
                var data = response.data;
                data.server = ENV.netentServer;
                return data;
            });
        }

    };

    return self;
});
