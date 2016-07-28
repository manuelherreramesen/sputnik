'use strict';

angular.module('sputnikApp.story').controller('SettingsCtrl', function($rootScope, $scope, $filter, $modal, toastr, UserService, AvatarService) {

    // View helpers
    $scope.getCharacterName = AvatarService.getCharacterName;
    $scope.getLatestStoryPicture = UserService.getLatestStoryPicture;
    $scope.getCorrectLevelPicture = UserService.getCorrectLevelPicture;

    // Read/Write mode
    $scope.settings = {
        personal: 'r',
        contact: 'r',
        account: 'r'
    };
    
    $scope.edit = function(form, section) {
        $scope.userCopy = angular.copy(UserService.identity);
        $scope.settings[section] = 'w';
    };
    $scope.save = function(form, section) {
        form.submitted = true;
        if (form.$valid) {
            form.thinking = true;
            UserService.update($scope.userCopy).then(function(user) {

            }).finally(function() {
                $scope.settings[section] = 'r';
                form.thinking = false;
                form.submitted = false;
            });
        }
    };

});
