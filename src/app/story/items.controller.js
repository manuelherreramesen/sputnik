'use strict';

angular.module('sputnikApp.story').controller('ItemsCtrl', function($rootScope, $scope, $filter, $modal, toastr, UserService, AvatarService) {

    // View helpers
    $scope.getCharacterName = AvatarService.getCharacterName;
    $scope.getLatestStoryPicture = UserService.getLatestStoryPicture;
    $scope.getCorrectLevelPicture = UserService.getCorrectLevelPicture;

    function sortActiveItems() {
        $scope.slots.active = _.sortBy($scope.slots.active, function sortActiveItemsPredicate(item) {
            // Sort by level
            return item !== undefined ? item.level : undefined;
        });
    }

    function sortUsedItems() {
        $scope.slots.used = _.sortBy($scope.slots.used, function sortUsedItemsPredicate(item) {
            // Sort by level reversed
            return item !== undefined ? -item.level : undefined;
        });
    }

    $scope.useItem = function (item) {
        var index = $scope.slots.active.indexOf(item);
        UserService.useItem(item).then(function(item) {
            var isDeposit = item.reward.type === 'DEPOSIT_BONUS';
            if (isDeposit) {
                toastr.success($filter('translate')('You have successfully used the item.\n\nThe deposit bonus is now available on the deposit page'), $filter('translate')('Items'));
            } else {
                toastr.success($filter('translate')('You have successfully used the item.'), $filter('translate')('Items'));
            }
            // Remove the used item from the actives
            $scope.slots.active.splice(index, 1);
            if ($scope.slots.active.length === 3) {
                $scope.slots.active.push({});
            }
            // Put the used item at the front of the used array
            $scope.slots.used.splice(0, 0, item);
            
            // If the last item is empty, remove it
            if ($scope.slots.used[$scope.slots.used.length] === undefined) {
                $scope.slots.used.splice(-1, 1);
            }

            sortUsedItems();
        }).catch(function(response) {
            switch (response.data.code) {
                case 6:
                    toastr.error($filter('translate')('The item was already used.'), $filter('translate')('Items'));
                    break;
            }
        });
    };

    $scope.slots = {
        active: [],
        used: []
    };

    UserService.fetchAllItems().then(function(items) {
        var i;

        for (i = 0; i < 4; i += 1 ) {
            $scope.slots.active.push({});
        }
        for (i = 0; i < 12; i += 1) {
            $scope.slots.used.push({});
        }

        angular.forEach(items.unusedItems, function(item, key) {
            $scope.slots.active[key] = item;
        });
        angular.forEach(items.usedItems, function(item, key) {
            $scope.slots.used[key] = item;
        });
        sortActiveItems();
        sortUsedItems();
    });

});