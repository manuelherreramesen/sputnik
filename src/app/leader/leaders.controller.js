'use strict';

angular.module('sputnikApp.leader').controller('LeadersCtrl', function($scope, LeaderService, UserService, AvatarService) {

    LeaderService.fetchAll();
    $scope.leaders = LeaderService.leaders;
	
	// View helpers
    $scope.getCharacterName = AvatarService.getCharacterName;
        
});