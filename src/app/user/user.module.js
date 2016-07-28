'use strict';

angular.module('sputnikApp.user', [])

.config(function($routeProvider) {
    $routeProvider
        .when('/register', {
            templateUrl: '/app/user/register.tpl.html',
            controller: 'RegisterCtrl'
        })
        .when('/reset-password/:uuid', {
            templateUrl: '/app/user/reset-password.tpl.html',
            controller: 'ResetPasswordCtrl'
        })
        .when('/verify/:code', {
            templateUrl: '/app/user/verify.tpl.html',
            controller: 'VerifyCtrl'
        });
})

.run(function($rootScope, UserService, $modal) {

    $rootScope.user = UserService.identity;
    UserService.load();

    $rootScope.popupLogin = function(redirectUrl) {
        var scope = $rootScope.$new(false);
        scope.redirectUrl = redirectUrl;
        var modal = $modal({
            scope: scope,
            template: '/app/user/login.tpl.html',
            show: false
        });
        modal.$promise.then(modal.show);
    };

    $rootScope.popupLoginSignup = function(redirectUrl) {
        var scope = $rootScope.$new(false);
        scope.redirectUrl = redirectUrl;
        var modal = $modal({
            scope: scope,
            template: '/app/user/login-signup.tpl.html',
            show: false
        });
        modal.$promise.then(modal.show);
    };

    $rootScope.logout = function() {
        UserService.logout();
    };

    $rootScope.$on('$routeChangeSuccess', function() {
        // If user is logged in, he just did something, refresh his inactivity timer
        if (angular.isNumber(UserService.identity.id)) {
            UserService.refreshInactivityTimer();
            UserService.setCookie();
        }
    });

});
