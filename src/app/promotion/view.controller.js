'use strict';

angular.module('sputnikApp.promotion').controller('ViewCtrl', function($scope, $sce, promotion) {
    $scope.promotion = promotion;
    $scope.promotion.tpl = '/app/promotion/content/' + promotion.name + '.tpl.html';
    $sce.trustAsResourceUrl($scope.promotion.tpl);
});
