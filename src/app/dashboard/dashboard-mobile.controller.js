'use strict';

angular.module('sputnikApp.dashboard').controller('DashboardMobileCtrl', function($scope, $http, $routeParams, CasinoService) {

    var categorySlug = $routeParams.category || 'featured';

    CasinoService.fetchAllTouch().then(function(categories) {
        var games = [];
        $scope.categories = categories;
        angular.forEach(categories, function(category) {
            if (category.slug === categorySlug) {
                $scope.selectedCategory = category;
                return false;
            }
        });
    });

});