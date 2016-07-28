'use strict';

angular.module('sputnikApp.casino').filter('gameCategories', function() {

    return function(games, category) {
        if (typeof games === 'undefined') {
            return;
        }

        var returned = [];
        angular.forEach(games, function(i, k) {
            if (category === 'all-games' || i.category === category) {
                returned.push(i);
            }
        });

        return returned;
    };

});