'use strict';

/**
 * TODO: Move the routeChangeSuccess stuff to a service
 */
angular.module('sputnikApp.common').directive('activeTab', function ($location) {
    return {
        link: function postLink(scope, element, attrs) {
            scope.$on('$routeChangeSuccess', function (event, current, previous) {
                var pathLevel = attrs.activeTab || 1,
                    pathToCheck = $location.path().split('/')[pathLevel],
                    tabLink = element.children('a')[0].hash.split('/')[pathLevel];

                if (pathToCheck === tabLink) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
            scope.$on('$includeContentLoaded', function(event) {
                var pathLevel = attrs.activeTab || 1,
                    pathToCheck = $location.path().split('/')[pathLevel],
                    tabLink = element.children('a')[0].hash.split('/')[pathLevel];

                if (pathToCheck === tabLink) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
        }
    };
});