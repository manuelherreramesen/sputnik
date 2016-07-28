'use strict';

angular.module('sputnikApp.payment').controller('TransactionHistoryCtrl', function($scope, $http, $filter, ngTableParams, PaymentService) {

    $scope.filter = {
        transactionFilter: PaymentService.transactionFilter
    };

    $scope.filterBack = function(dateReduction) {
        var date = new Date();
        date.setDate(date.getDate() - dateReduction);
        $scope.filter.transactionFilter.startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        $scope.transactionHistory.reload();
    };

    /* jshint ignore:start */
    $scope.transactionHistory = new ngTableParams({
        page: 1,
        count: 10,
        sorting: {
            id: 'desc'
        }
    }, {
        counts: [],
        getData: function ($defer, params) {
            $scope.filter.transactionFilter.page = params.$params.page;
            PaymentService.fetchAll().then(function (data) {
                params.total(data.count);
                $defer.resolve(data.transactions);
            });
        }
    });
    /* jshint ignore:end */

});
