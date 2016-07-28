'use strict';

angular.module('sputnikApp.dashboard').controller('DashboardCtrl', function($scope, $http, UserService, AvatarService, LocaleService) {

    var language = LocaleService.getLanguage();

    // View helpers
    $scope.getCharacterName = AvatarService.getCharacterName;
    $scope.getLatestStoryPicture = UserService.getLatestStoryPicture;
    $scope.getCorrectLevelPicture = UserService.getCorrectLevelPicture;

    /*
    $http.get('/app/data/activity.json').then(function(response) {
        $scope.activity = response.data;
    });
    */

    $scope.games = {
        interval: 3000,
        slides: [{
            image: '/images/pages/dashboard/welcome-bonus-' + language + '.jpg',
            link: '#/promotions/welcome-bonus',
            active: true
        }/*,
        {
            image: '/images/pages/dashboard/super-sunday-' + language + '.jpg',
            link: '#/promotions/super-sunday',
            active: true
        }*/
        ]
    };

});
