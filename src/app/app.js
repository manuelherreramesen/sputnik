'use strict';

angular.module('sputnikApp', [
    'config',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngTable',
    'gettext',
    'ui.bootstrap.carousel',
    'mgcrea.ngStrap',
    'ui.select',
    'jmdobry.angular-cache',
    'toastr',
    'angularMoment',
    'snap',
    'angulartics',
    'angulartics.google.analytics',
    'sputnikApp.common',
    'sputnikApp.home',
    'sputnikApp.dashboard',
    'sputnikApp.user',
    'sputnikApp.payment',
    'sputnikApp.casino',
    'sputnikApp.promotion',
    'sputnikApp.story',
    'sputnikApp.leader',
    'sputnikApp.help',
    'sputnikApp.avatar',
    'sputnikApp.vip',
    'sputnikApp.locale',
    'sputnikApp.showroom',
    'sputnikApp.utils'
])

.config(function($routeProvider) {

    // $locationProvider.html5Mode(true);

    $routeProvider.otherwise({
        redirectTo: '/'
    });

})

.config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', 'https://payments.blingcity.com/**']);
})

.config(function($popoverProvider, $modalProvider) {
    angular.extend($popoverProvider.defaults, {
        template: '/app/common/popover.tpl.html',
        animation: 'am-flip-x',
        trigger: 'hover'
    });
    angular.extend($modalProvider.defaults, {
        animation: 'am-fade'
    });
})

.config(function($httpProvider) {
    $httpProvider.defaults.headers.common.Accept = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
})

.config(function($angularCacheFactoryProvider) {

    // optionally set cache defaults
    $angularCacheFactoryProvider.setCacheDefaults({

        // This cache can hold 1000 items
        capacity: 1000,

        // Items added to this cache expire after 15 minutes
        maxAge: 900000,

        // Items will be actively deleted when they expire
        deleteOnExpire: 'aggressive',

        // This cache will check for expired items every minute
        recycleFreq: 60000,

        // This cache will clear itself every hour
        cacheFlushInterval: 3600000,

        // This cache will sync itself with localStorage
        storageMode: 'localStorage',

        // Custom implementation of localStorage
        //storageImpl: myLocalStoragePolyfill,

        // Full synchronization with localStorage on every operation
        verifyIntegrity: true,

        // This callback is executed when the item specified by "key" expires.
        // At this point you could retrieve a fresh value for "key"
        // from the server and re-insert it into the cache.
        onExpire: function(key, value) {

        }

    });

})

.config(function(snapRemoteProvider) {
    snapRemoteProvider.globalOptions.disable = 'right';
})

.config(function(uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
})

.run(function($rootScope, $location, $sce, UrlService, snapRemote, BackgroundService, ENV) {

    $rootScope.cdn = ENV.cdn;

    BackgroundService.start();

    UrlService.start();

    // Disable snapper if we're not on mobile
    snapRemote.getSnapper().then(function(instance) {
        if (!window.isMobile) {
            instance.disable();
        }
    });

    $rootScope.rhsActive = null;
    $rootScope.toggleRhsItem = function(active) {
        if ($rootScope.rhsActive === active) {
            $rootScope.rhsActive = null;
        } else {
            $rootScope.rhsActive = active;
        }
    };

    // Zenbox
    Zenbox.init({
        dropboxID: '20240852',
        url: 'https://blingcity.zendesk.com',
        tabTooltip: 'Support',
        tabImageURL: 'https://p3.zdassets.com/external/zenbox/images/tab_support.png',
        tabColor: 'black',
        tabPosition: 'Left'
    });

    $rootScope.openSupport = function() {
        Zenbox.show();
    };

});
