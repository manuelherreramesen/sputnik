'use strict';

angular.module('sputnikApp.user').controller('ResetPasswordCtrl', function($scope, $routeParams, $location, $filter, toastr, UserService) {

    $scope.request = {
        uuid: $routeParams.uuid,
        password: '',
        confirmPassword: ''
    };

    $scope.ui = {
        loading: false,
        correctCode: true
    };

    $scope.resetPassword = function(form) {
        if (form.$valid) {
            $scope.ui.loading = true;
            UserService.resetPassword($scope.request.uuid, $scope.request.password).then(function() {
                toastr.success($filter('translate')('You have successfully changed your password, you may now login using the new one.'), $filter('translate')('Password Reset'));
                $location.url('/');
            }).catch(function() {
                toastr.error($filter('translate')('There was an issue resetting your password.'), $filter('translate')('Password Reset'));
            }).finally(function() {
                $scope.ui.loading = false;
            });
        }
    };

});
