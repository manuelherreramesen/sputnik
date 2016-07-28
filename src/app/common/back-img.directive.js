'use strict';

angular.module('sputnikApp.common').directive('backImg', function() {
    return {
        link: function(scope, element, attrs) {
            attrs.$observe('backImg', function(value) {
                element.css({
                    'background-image': 'url(' + value +')'
                });
            });
        }
    };
});