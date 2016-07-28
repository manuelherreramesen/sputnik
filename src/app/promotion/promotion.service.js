'use strict';

angular.module('sputnikApp.promotion').service('PromotionService', function($http, $angularCacheFactory, LocaleService) {
    
    //Un-comment to force refresh of json files.
    //$angularCacheFactory.clearAll();
    //$angularCacheFactory('promotionService').removeAll();
    var cache = $angularCacheFactory('promotionService');

    var self = {

        fetchAll: function () {
            return $http({
                method: 'GET',
                url: '/app/data/promotions-' + LocaleService.getLanguage() + '.json',
                cache: cache
            }).then(function (response) {
                return response.data;
            });
        },

        fetch: function (id) {
            return $http({
                method: 'GET',
                url: '/app/data/promotions/' + id + '.json',
                cache: cache
            }).then(function(response) {
                return response.data;
            });
        }

    };

    return self;
});
