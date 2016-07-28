'use strict';

angular.module('sputnikApp.payment').controller('BonusesCtrl', function ($scope, $sce, $filter, $timeout, $routeParams, UserService, toastr, PaymentService) {

    $scope.user = UserService.identity;

    $scope.pies = [{
        'pcent': 75
    }, {
        'pcent': 50
    }];

    $scope.playerBonuses = {};

    PaymentService.getPlayerBonuses().then(function (data) {
        var i = 0, style = '';

        $scope.playerBonuses.totalAmount = data.totalAmount;
        $scope.playerBonuses.bonuses = [];

        angular.forEach(data.bonuses, function (bonus) {
            if (bonus.bonusStatus === 'ACTIVE' || bonus.bonusStatus === 'INACTIVE'){
                bonus.active = (bonus.bonusStatus === 'ACTIVE');
                bonus.removed = false;
                bonus.playthroughPending = bonus.bonusConversionGoal - bonus.bonusConversionProgress;
                bonus.idx = i;
                bonus.pie = {};
                bonus.pie.pcent = Math.floor(bonus.bonusConversionProgressPercentage);
                bonus.pie.pendingPcent = Math.floor(100 - bonus.bonusConversionProgressPercentage);
                bonus.pie.deg = Math.abs(360 - ((bonus.bonusConversionProgressPercentage / 100) * 360));
                bonus.pie.isBig = bonus.pie.deg > 180;
                bonus.tpl = '/app/payment/bonus-popovers/bonus-popover' + ((i % 2) + 1) + '.tpl.html';
                style += '.bonus-pie div.overlay-' + i + ':before {-moz-transform:rotate(' + bonus.pie.deg + 'deg);-webkit-transform:rotate(' +
                         bonus.pie.deg + 'deg);-ms-transform:rotate(' + bonus.pie.deg + 'deg);transform:rotate(' + bonus.pie.deg + 'deg);}';
                style += '.bonus-pie div.overlay-' + i + ' {-moz-transform:rotate(' + (360 - bonus.pie.deg) + 'deg);-webkit-transform:rotate(' +
                         (360 - bonus.pie.deg) + 'deg);-ms-transform:rotate(' + (360 - bonus.pie.deg) + 'deg);transform:rotate(' +
                         (360 - bonus.pie.deg) + 'deg);}';
                i++;
                $scope.playerBonuses.bonuses.push(bonus);
            }
        });
        if (document.getElementById('bonusPieStyle') === null) {
            var css = document.createElement('style');
            css.id = 'bonusPieStyle';
            css.type = 'text/css';
            if (css.styleSheet) {
                css.styleSheet.cssText = style;
            } else {
                css.appendChild(document.createTextNode(style));
            }
            document.getElementsByTagName('head')[0].appendChild(css);
        }
    });

    $scope.start = function (form) {
        console.log('start');
        form.submitted = true;
        if (form.$valid) {
        }
    };

    $scope.cancelBonus = function (id,idx) {
        PaymentService.cancelPlayerBonus(id).then(function () {
            $scope.playerBonuses.bonuses[idx].removed = true;
            $scope.playerBonuses.totalAmount = $scope.playerBonuses.totalAmount - $scope.playerBonuses.bonuses[idx].currentBalance;
        });
    };

});
