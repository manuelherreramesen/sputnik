'use strict';

angular.module('sputnikApp.casino', [])

.config(function($routeProvider) {

    $routeProvider
        .when('/play/:id', {
            templateUrl: '/app/casino/play.tpl.html',
            controller: 'PlayCtrl',
            resolve: {
                mustAuth: ['RouteService', function(RouteService) {
                    RouteService.mustAuth('/');
                }],
                game: ['$route', '$filter', '$location', 'CasinoService', 'toastr', function($route, $filter, $location, CasinoService, toastr) {
                    if (window.isMobile) {

                        return CasinoService.createTouchSession($route.current.params.id).then(function(game) {
                            window.location = game.staticUrl + '?lobbyURL=' + $location.protocol() + encodeURIComponent('://') +
                            $location.host() + '&server=' + encodeURIComponent(game.server) + '&operatorId=' + game.operatorId +
                            '&gameId=' + game.gameId + '&lang=' + game.language + '&sessId=' + game.sessionId;
                            return;
                        });

                    } else {
                        return CasinoService.createSession($route.current.params.id).then(function(game) {
                            game.gameId = $route.current.params.id;
                            return game;
                        }).catch(function(response) {
                            history.back();
                            // Check if we have an error code to print a message
                            if (typeof response.data.code !== 'undefined') {
                                switch (response.data.code) {
                                    default:
                                    case 1:
                                        toastr.error($filter('translate')('There was a problem opening that game.'), $filter('translate')('Game'));
                                        return;
                                    case 7:
                                        toastr.error($filter('translate')('You have reached a limit and cannot play anymore.'), $filter('translate')('Game'));
                                        return;
                                }
                            } else {
                                // Possibly an internal error or similar... might as well show a message to the user
                                toastr.error($filter('translate')('There was a problem opening that game.'), $filter('translate')('Game'));
                            }
                        });
                    }
                }]
            }
        })
        .when('/game-sessions', {
            templateUrl: '/app/casino/session.tpl.html',
            controller: 'SessionCtrl',
            resolve: {
                mustAuth: ['RouteService', function(RouteService) {
                    RouteService.mustAuth('/');
                }]
            }
        });

    if (window.isMobile) {

        $routeProvider.when('/games/:category', {
            templateUrl: '/app/casino/lobby-mobile.tpl.html',
            controller: 'LobbyMobileCtrl'
        });

    } else {

        $routeProvider.when('/games/:category', {
            templateUrl: '/app/casino/lobby.tpl.html',
            controller: 'LobbyCtrl'
        });

    }
});
