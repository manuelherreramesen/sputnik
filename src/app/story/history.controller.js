'use strict';

angular.module('sputnikApp.story').controller('HistoryCtrl', function($rootScope, $scope, $filter, $modal, toastr, UserService, AvatarService) {

    // View helpers
    $scope.getCharacterName = AvatarService.getCharacterName;
    $scope.getLatestStoryPicture = UserService.getLatestStoryPicture;
    $scope.getCorrectLevelPicture = UserService.getCorrectLevelPicture;

    UserService.fetchAllStories().then(function(stories) {
        $scope.stories = stories;
    });

    $scope.preview = function(story) {
        var scope = $rootScope.$new(false);
        scope.story = story;
        var modal = $modal({
            scope: scope,
            template: '/app/story/story-preview.tpl.html',
            show: false
        });
        modal.$promise.then(modal.show);
    };

});
