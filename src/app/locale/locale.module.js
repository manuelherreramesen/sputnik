'use strict';

angular.module('sputnikApp.locale', [])

.run(function($rootScope, LocaleService, LANGUAGES) {

    function setZenboxId(locale) {
        // Set correct zenbox ID
        angular.forEach(LANGUAGES, function(language) {
            if (language.code === locale) {
                Zenbox.update({
                    dropboxID: language.supportCode
                });
            }
        });
    }

    LocaleService.load().then(function(locale) {
        $rootScope.currentLocale = locale;
        $rootScope.currentLanguage = locale.substr(0, 2);
        setZenboxId(locale);
    });

    $rootScope.changeLocale = function(locale) {
        LocaleService.useLocale(locale).then(function() {
            $rootScope.currentLocale = locale;
            $rootScope.currentLanguage = locale.substr(0, 2);
            setZenboxId(locale);
        });
    };

});
