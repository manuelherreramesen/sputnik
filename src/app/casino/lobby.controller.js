'use strict';

angular.module('sputnikApp.casino').controller('LobbyCtrl', function($scope, $routeParams, $modal, CasinoService, $location, UserService, $rootScope) {

    CasinoService.fetchAll().then(function(categories) {
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
                        template: '/app/payment/empty-wallet.tpl.html',
                        show: false
                    });
                    modal.$promise.then(modal.show);
                }
            });
        }
    };

});
