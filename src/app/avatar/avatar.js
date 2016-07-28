'use strict';

angular.module('sputnikApp.avatar', [])

.service('AvatarService', function($http, $filter, $angularCacheFactory, ENV) {

    var cache = $angularCacheFactory('avatarService');
    var avatars = [{
        id: 1,
        name: 'Cosmo Girl',
        description: $filter('translate')('Bling City - It\'s not logic, it\'s love.')
    }, {
        id: 2,
        name: 'Fashionista',
        description: $filter('translate')('That\'s a winning combination!')
    }, {
        id: 3,
        name: 'Harvey Goodlife',
        description: $filter('translate')('Experience beats luck')
    }, {
        id: 4,
        name: 'Mr Vegas',
        description: $filter('translate')('Money won is twice as sweet as money earned')
    }, {
        id: 5,
        name: 'Mr Wallstreet',
        description: $filter('translate')('Greed is good')
    }, {
        id: 6,
        name: 'Rocker',
        description: $filter('translate')('f**ck it - let\'s play')
    }, {
        id: 7,
        name: 'Slotmachine Betty',
        description: $filter('translate')('I am such a lucky lady')
    }, {
        id: 8,
        name: 'The DJ',
        description: $filter('translate')('Spin it')
    }, {
        id: 9,
        name: 'The Driver',
        description: $filter('translate')('My Wheel is my fortune')
    }, {
        id: 10,
        name: 'Yacht Club William',
        description: $filter('translate')('Champagne anyone?')
    }];

    var self = {

        /**
         * Levels ending in 2, 5, 8 have a surprise
         */
        levelHasSurprise: function(level) {
            var string = level.toString();
            var lastNumber = string.substr(string.length - 1, 1);
            if (lastNumber === '2' || lastNumber === '5' || lastNumber === '8') {
                return true;
            }
            return false;
        },

        fetchAllLevels: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/levels',
                data: {},
                cache: cache
            }).then(function(response) {
                return response.data;
            });
        },

        getCharacterName: function(avatarBaseTypeId) {
            return avatars[(avatarBaseTypeId - 1)].name;
        },

        getCharacterDescription: function(avatarBaseTypeId) {
            return avatars[(avatarBaseTypeId - 1)].description;
        }

    };

    return self;
});