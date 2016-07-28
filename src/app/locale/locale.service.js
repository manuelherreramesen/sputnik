'use strict';

angular.module('sputnikApp.locale').service('LocaleService', function($http, $angularCacheFactory, gettextCatalog, LANGUAGES) {

    var cache = $angularCacheFactory('localeService');

    var self = {

        storageKey: 'LOCALE',
        locale: 'en_US',

        load: function() {

            var locale = self.getBrowserLanguage();

            if (cache.get(self.storageKey)) {
                locale = cache.get(self.storageKey);
            }

            return self.useLocale(locale);
        },

        getAvailableLanguages: function() {
            return LANGUAGES;
        },

        /**
        * There are a million versions of english en_US, en_GB etc
        */
        getAliasedLocale: function(locale) {
            switch (locale.substr(0, 2)) {
                case 'nb':
                case 'no':
                case 'nn':
                    return 'nb_NO';
                case 'sv':
                    return 'sv_SE';
                default:
                    return 'en_US';
            }
        },

        getAccountFriendlyLanguage: function() {
            switch (self.locale) {
                case 'no':
                    return 'NORWEGIAN';
                case 'sv':
                    return 'SWEDISH';
                default:
                    return 'ENGLISH';
            }
        },

        getBrowserLanguage: function() {
            return window.navigator.userLanguage || window.navigator.language;
        },

        getFlag: function(locale) {
            return locale.substr(3, 2).toLowerCase();
        },

        getLocale: function() {
            return self.locale;
        },

        getLanguage: function() {
            return self.locale.substr(0, 2);
        },

        useLocale: function(locale) {

            self.locale = self.getAliasedLocale(locale);

            // Store language we set in here
            cache.put(self.storageKey, locale);

            // Set list of languages to active
            angular.forEach(LANGUAGES, function(language) {
                if (language.code === locale) {
                    language.active = true;
                } else {
                    language.active = false;
                }
            });

            return $http({
                method: 'GET',
                url: '/languages/' + self.locale + '.json',
                cache: cache
            }).then(function(response) {
                gettextCatalog.currentLanguage = self.locale;
                gettextCatalog.setStrings(self.locale, response.data[self.locale]);
                return self.locale;
            });
        }

    };

    return self;
});