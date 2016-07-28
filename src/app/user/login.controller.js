'use strict';

angular.module('sputnikApp.user').controller('LoginCtrl', function($scope, $modal, $filter, $location, $timeout, toastr, UserService, UtilsService) {

    // modalLoaded is to focus on the input field upon loading
    $scope.modalLoaded = true;
    $scope.thinking = false;
    $scope.incorrectDetails = false;

    // Switching views
    $scope.view = 'login';
    $scope.showForgotPassword = function() {
        $scope.view = 'forgot-password';
    };
    $scope.showLogin = function() {
        $scope.view = 'login';
    };
    $scope.close = function() {
        $scope.$hide();
    };

    $scope.login = function(loginForm, emailAddress, password) {

        loginForm.submitted = true;

        if (loginForm.$valid) {

            $scope.thinking = true;

            UserService.login(emailAddress, password).then(function(response) {
                $scope.incorrectDetails = false;
                $location.path($scope.redirectUrl);
                $scope.$hide();
            }).catch(function(response) {
                switch (response.data.code) {
                    case 25:
                        toastr.error($filter('translate')('Login is currently disabled'), $filter('translate')('Login'));
                        break;
                    default:
                        $scope.incorrectDetails = true;
                        break;
                }
            }).finally(function() {
                $scope.thinking = false;
            });
        }
    };

    $scope.forgotPassword = function(forgotForm, emailAddress) {
        if (forgotForm.$valid) {

            $scope.thinking = true;

            UserService.forgotPassword(emailAddress).then(function(response) {
                toastr.success($filter('translate')('An email has been sent with instructions on how to reset your password.'), $filter('translate')('Instructions sent'));
                $scope.$hide();
            }).catch(function(response) {
                toastr.error($filter('translate')('We could not find the email provided.'), $filter('translate')('Problem'));
            }).finally(function(response) {
                $scope.thinking = false;
            });
        }
    };

});
