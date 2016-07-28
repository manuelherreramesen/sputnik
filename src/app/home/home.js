'use strict';

angular.module('sputnikApp.home', [])

.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '/app/home/home.tpl.html',
            controller: 'HomeCtrl'
        });

})

.controller('HomeCtrl', function($scope, AvatarService) {

    // ViewHelpers
    $scope.getCharacterName = AvatarService.getCharacterName;
    $scope.getCharacterDescription = AvatarService.getCharacterDescription;

})

.controller('sliderCtrl', function($scope) {

    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        var newWidth = 600 + slides.length;
        slides.push({
            index: slides.length+1,
            title: ['Cosmogirl','Fashionista','Harvey Goodlife','Mr Vegas','Mr Wallstreet','Rocker','Slotmachine Betty','The DJ','The Driver','Yacht Club William'][slides.length],
            text: $scope.getCharacterDescription(slides.length+1)
        });
    };
    for (var i=0; i<10; i++) {
        $scope.addSlide();
    }

})

.directive('resizable', function($window) {
    return function($scope) {
        $scope.initializeWindowSize = function() {
            $scope.windowHeight = $window.innerHeight;
            $scope.windowWidth = $window.innerWidth;
            return $scope.windowWidth;
        };
        $scope.initializeWindowSize();
        return angular.element($window).bind('resize', function() {
            $scope.initializeWindowSize();
            return $scope.$apply();
        });
    };
});
