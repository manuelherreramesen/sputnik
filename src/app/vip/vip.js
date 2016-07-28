'use strict';

angular.module('sputnikApp.vip', [])

.config(function($routeProvider) {

    $routeProvider
        .when('/vip', {
            templateUrl: '/app/vip/vip.tpl.html',
            controller: 'VipCtrl'
        });

})

.controller('VipCtrl', function($scope, AvatarService) {

    $scope.rowsVisible = 12;
    $scope.welcomeMore = false;
    
    $scope.toggleWelcomeMore = function() {
        $scope.welcomeMore = !$scope.welcomeMore;
    };
    
    $scope.fixHead = function(){
        for (var i = 0; i < $scope.thElArr.length; ++i) {
            angular.element($scope.thElArr[i]).attr('width', $scope.othElArr[i].offsetWidth);
        }
    };

    $scope.toggleTable = function() {
        if ($scope.rowsVisible === 12) {
            $scope.rowsVisible = $scope.levels.length;
        } else {
            $scope.rowsVisible = 12;
        }
        setTimeout(function(){
            $scope.fixHead();
        },100);
    };

    $scope.levelHasSurprise = AvatarService.levelHasSurprise;
    AvatarService.fetchAllLevels().then(function(data) {
        $scope.levels = data;
    });

})

.directive('stickyhead', function($window,$compile) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            setTimeout(function() {
                var ae = angular.element;
                var parent = ae(el.parent()),
                    nthead = ae(document.createElement('table')),
                    othead = el.find('thead').clone();
                nthead.attr('class','thead table-striped-fancy');
                nthead.attr('sticky','');
                parent.append(nthead);
                
                scope.othElArr = ae(ae(el.children()[0]).children()[0]).children();
                scope.thElArr = ae(othead.children()[0]).children();
                scope.fixHead();
                
                nthead.append(othead);
                
                $compile(nthead)(scope);
                nthead.css({top: 0, left: 0});
            }, 3000);
        }
    };
})

.directive('sticky', function($window) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            
            function returnDigit(val) {
                var re = /\d+/;
                var digit = val.match(re)[0];
                return digit;
            }
            function handleSnapping() {
                if (window.prop('scrollTop') >= (offTop - otOffset)) {
                    var nuTop = window.prop('scrollTop') - stOffset;
                    //nuTop = (nuTop > -1) ? nuTop : 0;
                    el.css({
                        top: nuTop + 'px'
                    });
                } else {
                    el.css(origCss);
                }
            }
            function offset(elm) {
                var rawDom = elm[0];
                var _y = 0;
                var scrollY = window.prop('scrollTop');
                _y = rawDom.getBoundingClientRect().top;
                return _y;
            }

            var window = angular.element(document.getElementsByTagName('snap-content')[0]),
                parent = angular.element(el.parent()),
                offTop = offset(el),
                origCss = {
                    top: 0
                };
                
            handleSnapping();
            
            window.bind('scroll', function () {
                handleSnapping();
            });
            
            var otOffset = (isIE()) ? 400 : 163;
            var stOffset = (isIE()) ? 400 : 546;
        }
    };
});
