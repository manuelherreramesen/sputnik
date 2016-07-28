'use strict';

angular.module('sputnikApp.casino').controller('SessionCtrl', function($scope, $http, $filter, ngTableParams, UserService) {

    $scope.filter = {
        sessionFilter: UserService.sessionFilter
    };

    $scope.filterBack = function(dateReduction) {
        var date = new Date();
        date.setDate(date.getDate() - dateReduction);
        $scope.filter.sessionFilter.startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        $scope.gameSessionHistory.reload();
    };

    /* jshint ignore:start */
    $scope.gameSessionHistory = new ngTableParams({
        page: 1,
        count: 10,
        sorting: {
            id: 'desc'
        }
    }, {
        counts: [],
        getData: function ($defer, params) {
            $scope.filter.sessionFilter.page = params.$params.page;
            UserService.getGameSessions().then(function (data) {
                params.total(data.count);
                $defer.resolve(data.gameSessions);
            });
        }
    });
    /* jshint ignore:end */

});
