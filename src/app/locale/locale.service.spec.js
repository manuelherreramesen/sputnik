'use strict';

describe('Service: LocaleService', function() {

    var LocaleService;

    beforeEach(function() {

        module('sputnikApp');
        inject(function(_LocaleService_) {
            LocaleService = _LocaleService_;
        });

    });

    it('should have a load method', function() {
        expect(angular.isFunction(LocaleService.load)).toBe(true);
    });

    it('should have a getBrowserLanguage method', function() {
        expect(angular.isFunction(LocaleService.getBrowserLanguage)).toBe(true);
    });

    it('should return en_US from getLocale by default', function() {
        expect(LocaleService.getLocale()).toBe('en_US');
    });

    it('should have a getAccountFriendlyLanguage method', function() {
        expect(angular.isFunction(LocaleService.getAccountFriendlyLanguage)).toBe(true);
    });

    it('should return ENGLISH from getAccountFriendlyLanguage by default', function() {
        expect(LocaleService.getAccountFriendlyLanguage()).toBe('ENGLISH');
    });

    it('should have a getLocale method', function() {
        expect(angular.isFunction(LocaleService.getLocale)).toBe(true);
    });

    it('should have a useLocale method', function() {
        expect(angular.isFunction(LocaleService.useLocale)).toBe(true);
    });
});