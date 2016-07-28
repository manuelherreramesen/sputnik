'use strict';

angular.module('sputnikApp.common').directive('object', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var current = element;

            scope.$watch('[' + attrs.ngData + ',' + attrs.ngParam + ']', function(newVal) {
                
                var clone = element.clone().attr('data', newVal[0]);
                var content = '';

                angular.forEach(newVal[1], function(value, name) {
                    content += '<param name="' + name + '" value="' + value + '">';
                });

                current.replaceWith(clone.html(content += '<embed src="' + newVal[0] + '"></embed>'));
                current = clone;
            }, true);
        }
    };
});