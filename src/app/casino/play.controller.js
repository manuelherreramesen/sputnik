'use strict';

angular.module('sputnikApp.casino').controller('PlayCtrl', function($rootScope, $scope, $timeout, $interval, $window, game, BackgroundService, UserService, ENV) {

    var realityCheckInterval = 60 * 60 * 1000;
    var creditDisplayTimeout = 1 * 60 * 1000;
    var originalWallet = angular.copy($rootScope.user.wallet);
    var oldCredits = originalWallet.creditsBalance;

    BackgroundService.stop();

    $scope.game = game;
    $scope.ui = {
        panel: {
            open: true,
            blings: 0
        },
        realityCheck: {
            hours: 0,
            amount: 0,
            enabled: false
        }
    };

    $scope.abs = function(val) {
        return Math.abs(val);
    };

    function displayRealityCheck() {

        // Check amount against original wallet
        var totalThen = originalWallet.moneyBalance + originalWallet.bonusBalance;
        var totalNow = $rootScope.user.wallet.moneyBalance + $rootScope.user.wallet.bonusBalance;

        $scope.ui.realityCheck.hours += 1;
        $scope.ui.realityCheck.amount = totalNow - totalThen;
        $scope.ui.realityCheck.enabled = true;
    }

    $scope.closeRealityCheck = function() {
        $scope.ui.realityCheck.enabled = false;
        // Restart the countdown to display it again
        $timeout(function() {
            displayRealityCheck();
        }, realityCheckInterval);
    };

    $timeout(function() {
        displayRealityCheck();
    }, realityCheckInterval);

    $scope.rules = $window.rules = function(url) {
        $window.open(ENV.netentServer + url, 'Rules', 'directories=no, location=no, menubar=no, resizable=no, scrollbars=yes, status=no, toolbar=no, width=440, height=420');
    };

    $rootScope.$on('refreshPlayer', function(event, identity) {
        // Check if leveled up (has more blings)
        if (oldCredits !== identity.wallet.creditsBalance) {

            // Temporary - This doesn't really belong in here
            UserService.fetchAllStories(true);

            $scope.ui.blings = identity.wallet.creditsBalance - oldCredits;
            $scope.ui.panel.open = true;

            // For now... we can just hide it after a time
            $timeout(function() {
                $scope.ui.blings = 0;
            }, creditDisplayTimeout);

            // For next comparison
            oldCredits = identity.wallet.creditsBalance;
        }
    });

});