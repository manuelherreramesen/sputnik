'use strict';

angular.module('sputnikApp.showroom').service('ShowroomService', function($angularCacheFactory) {

    var cache = $angularCacheFactory('showroomService');
    var STOP_ANNOYING_KEY = 'stopAnnoyingMe';
    var self = {

        setAnnoyed: function(annoyed) {
            cache.put(STOP_ANNOYING_KEY, annoyed);
        },

        isPlayerAnnoyed: function() {
            if (cache.get(STOP_ANNOYING_KEY) && cache.get(STOP_ANNOYING_KEY) === true) {
                return true;
            }
            return false;
        }

    };
    return self;

});
