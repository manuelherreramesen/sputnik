'use strict';

angular.module('sputnikApp.casino').controller('LobbyMobileCtrl', function($scope, $routeParams, $modal, CasinoService, $location, UserService, $rootScope) {

    CasinoService.fetchAllTouch().then(function(categories) {
        $scope.categories = categories;
        angular.forEach(categories, function(category) {
            if (category.slug === $routeParams.category) {
                $scope.selectedCategory = category;
                return false;
            }
        });
    });

    $scope.playGame = function (gameId) {
        var wallet = UserService.identity.wallet;

        if (wallet.moneyBalance + wallet.bonusBalance > 0) {
            $location.path('/play/' + gameId);
        } else {
            CasinoService.fetchFreeRounds().then(function (data) {
                if (_.contains(data, gameId)) {
                    $location.path('/play/' + gameId);
                } else {
                    var scope = $rootScope.$new(false);
                    var modal = $modal({
                        scope: scope,
                        template: '/app/payment/empty-wallet-mobile.tpl.html',
                        show: false
                    });
                    modal.$promise.then(modal.show);
                }
            });
        }
    };

});
