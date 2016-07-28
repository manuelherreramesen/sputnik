'use strict';

angular.module('sputnikApp').filter('gender', function () {

    return function (characters, scope) {

        if (typeof characters === 'undefined') {
            return;
        }

        var returned = [];

        angular.forEach(characters, function (i, k) {

            if (scope.gender === 'any' || scope.gender === i.gender) {
                returned.push(i);
            }
        });

        return returned;
    };

});
