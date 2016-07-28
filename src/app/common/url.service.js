'use strict';

angular.module('sputnikApp.common').service('UrlService', function ($rootScope, $location, UtilsService) {

    var BTAG = 'bc_btag',

        bTagPattern = /\?btag=(\S{39})/;

    return {
        start: function () {
            $rootScope.$on('$routeChangeSuccess', function () {
                //NetRefer btag capturing and cookie generation.
                var btagArray = bTagPattern.exec($location.absUrl()), expires = new Date(), host = $location.host(), bTag;
                if (btagArray !== null) {
                    bTag = btagArray[1];
                    if (host.indexOf('www') === 0) {
                        host = host.substring(3);
                    }
                    expires.setDate(expires.getDate() + 30);

                    UtilsService.setCookie(BTAG, bTag, expires.toUTCString(), '/', host);
                    $rootScope.btag = bTag;

                    // Remove the btag from the url
                    if ($location.$$search.btag) {
                        delete $location.$$search.btag;
                        $location.$$compose();
                    }
                } else {
                    bTag = UtilsService.getCookie(BTAG);
                    if (bTag !== undefined) {
                        $rootScope.btag = bTag;
                    }
                }

                //Moved this over here from app.js as this is a more appropriate place for
                //these url/route dependent triggers.
                document.querySelector('snap-content').scrollTop = 0;
            });
        }
    };
});
