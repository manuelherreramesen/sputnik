'use strict';

angular.module('sputnikApp.utils').service('UtilsService', function () {
    return {
        getQueryVariable: function (query, variable) {
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) === variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
        },

        convertCookiesToObject: function (rawCookies) {
            var cookies = rawCookies.split('; '), cookieObject = {};
            _.each(cookies, function (cookie) {
                var cSplit = cookie.split(/=(.+)?/);
                cookieObject[cSplit[0]] = cSplit[1];
            });
            return cookieObject;
        },

        encryptCreditCard: function (cardNumber) {
            return encryptData(cardNumber.toString());
        },

        getCookie: function (sKey) {
            return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
                                                                         '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
        },

        setCookie: function (key, value, end, path, domain, secure) {
            if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
                return false;
            }
            var expires = '';
            if (end) {
                switch (end.constructor) {
                    case Number:
                        expires = end === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + end;
                        break;
                    case String:
                        expires = '; expires=' + end;
                        break;
                    case Date:
                        expires = '; expires=' + end.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value) + expires + (domain ? '; domain=' + domain : '') +
                              (path ? '; path=' + path : '') + (secure ? '; secure' : '');
            return true;
        },

        removeCookie: function (key, path, domain) {
            if (!key || !this.hasCookie(key)) {
                return false;
            }
            document.cookie = encodeURIComponent(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (domain ? '; domain=' + domain : '') +
                              (path ? '; path=' + path : '');
            return true;
        },

        hasCookie: function (key) {
            return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
        },

        cookies: function () {
            var key = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
            for (var index = 0; index < key.length; index++) {
                key[index] = decodeURIComponent(key[index]);
            }
            return key;
        }
    };
});
