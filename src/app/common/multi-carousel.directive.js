'use strict';

angular.module('sputnikApp.common')

.directive('multiCarousel', function($animate) {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: {},
        template: '<div class="multi-carousel">' +
                      '<div class="multi-carousel-inner" ng-transclude></div>' +
                      '<a ng-click="prev()" ng-show="items.length > 1" class="left carousel-control"><i class="icon icon-arrow-left"></i></a>' +
                      '<a ng-click="next()" ng-show="items.length > 1" class="right carousel-control"><i class="icon icon-arrow-right"></i></a>' +
                  '</div>',
        link: function(scope, element, attrs) {

            var carouselInner = angular.element(element[0].querySelector('.multi-carousel-inner'));

            scope.prev = function() {

                var firstItem = angular.element(element[0].querySelector('multi-slide:first-child'));

                if ($animate) {
                    $animate.addClass(firstItem, 'next', function() {
                        carouselInner.append(firstItem);
                        firstItem.removeClass('next');
                    });
                } else {
                    carouselInner.append(firstItem);
                }

            };

            scope.next = function() {

                var lastItem = angular.element(element[0].querySelector('multi-slide:last-child'));

                carouselInner.prepend(lastItem);

                if ($animate) {
                    $animate.addClass(lastItem, 'prev', function() {
                        lastItem.removeClass('prev');
                    });
                }

            };

        },
        controller: function($scope) {
                
            var items = $scope.items = [];

            this.add = function(item) {
                items.push(item);
            };

        }
    };
})
.directive('multiSlide', function() {
    return {
        restrict: 'EA',
        require: '^multiCarousel',
        transclude: true,
        scope: {
            active: '='
        },
        template: '<a ng-click="select()" ng-transclude></a>',
        link: function (scope, elem, attrs, ctrl) {

            ctrl.add(scope);

            scope.select = function() {
                scope.active = true;
            };
        }
    };
});