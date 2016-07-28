'use strict';

angular.module('sputnikApp.promotion').controller('PromotionsCtrl', function($rootScope, $scope, PromotionService) {

    $scope.$watch(function() {
        return $rootScope.currentLocale;
    }, function() {
        PromotionService.fetchAll().then(function(promotions) {
            $scope.promotions = promotions;
        });
    });

});
