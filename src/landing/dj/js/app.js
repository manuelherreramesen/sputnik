'use strict';

angular.module('landingPage', [
    'ngCookies',
    'ngRoute',
    'ngResource',
    'ngDialog'
])

.run(function($rootScope, $location, $cookieStore, ngDialog) {
    //NetRefer btag capturing and cookie generation.
    var btag_arr = /btag=(\S+?)$/.exec($location.$$absUrl);
    if (btag_arr !== null){
        $cookieStore.put('btag',btag_arr[1]);
    }
    if (typeof $cookieStore.get('btag') !== 'undefined'){
        $rootScope.bc_affiliate = '?btag='+$cookieStore.get('btag');
    }
    
    $rootScope.termsDialog = function () {
        ngDialog.open({ template: 'popover.tpl.html', scope: $rootScope });
    };
});