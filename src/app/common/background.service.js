'use strict';

angular.module('sputnikApp.common').service('BackgroundService', function($rootScope, $interval, ENV) {

    var self = {

        refreshTime: 12 * 1000,
        interval: undefined,

        start: function() {

            // Set a random background and have it change every 12 seconds
            $rootScope.randomBg = Math.floor((Math.random() * 7) + 1);
            self.interval = $interval(function() {

                var newBg = Math.floor((Math.random() * 7) + 1);
                var i = new Image();
                i.src = ENV.cdn + '/images/bg/sub-page/bg-' + newBg + '.jpg';
                i.onload = function() {
                    $rootScope.$apply(function() {
                        $rootScope.randomBg = newBg;
                    });
                };

            }, self.refreshTime);

        },

        stop: function() {
            $interval.cancel(self.interval);
        }
    };

    return self;
});