'use strict';

describe('Service: UserService', function() {

    var UserService;

    beforeEach(function() {

        module('sputnikApp');
        inject(function(_UserService_) {
            UserService = _UserService_;
        });

    });

    it('should have a login method', function() {
        expect(angular.isFunction(UserService.login)).toBe(true);
    });

    it('should have a logout method', function() {
        expect(angular.isFunction(UserService.logout)).toBe(true);
    });

    it('should have a create method', function() {
        expect(angular.isFunction(UserService.create)).toBe(true);
    });

    describe('Limit normalization', function() {
        
        it('should normalize limits correctly', function() {

            var data = {
                'limitList': [
                    {
                        'limitationType': 'LOSS_AMOUNT',
                        'timeUnit': 'DAY',
                        'amount': 300,
                        'percent': null
                    },
                    {
                        'limitationType': 'LOSS_AMOUNT',
                        'timeUnit': 'WEEK',
                        'amount': 400,
                        'percent': null
                    },
                    {
                        'limitationType': 'LOSS_AMOUNT',
                        'timeUnit': 'MONTH',
                        'amount': 500,
                        'percent': null
                    },
                    {
                        'limitationType': 'BET_AMOUNT',
                        'timeUnit': 'DAY',
                        'amount': 100,
                        'percent': null
                    },
                    {
                        'limitationType': 'BET_AMOUNT',
                        'timeUnit': 'MONTH',
                        'amount': 200,
                        'percent': null
                    }
                ],
                'sessionLength': 600
            };
            var expected = {
                BET_AMOUNT: {
                    DAY: 100,
                    WEEK: 0,
                    MONTH: 200
                },
                LOSS_AMOUNT: {
                    DAY: 300,
                    WEEK: 400,
                    MONTH: 500
                },
                sessionLength: 600
            };

            expect(UserService.normalizeLimits(data)).toEqual(expected);
        });

        it('should denormalize limits correctly', function() {

            var data = {
                BET_AMOUNT: {
                    DAY: 100,
                    WEEK: 0,
                    MONTH: 200
                },
                LOSS_AMOUNT: {
                    DAY: 300,
                    WEEK: 400,
                    MONTH: 500
                },
                sessionLength: 600
            };
            var expected = {
                'limitList': [
                    {
                        'limitationType': 'BET_AMOUNT',
                        'timeUnit': 'DAY',
                        'amount': 100,
                        'percent': null
                    },
                    {
                        'limitationType': 'BET_AMOUNT',
                        'timeUnit': 'MONTH',
                        'amount': 200,
                        'percent': null
                    },
                    {
                        'limitationType': 'LOSS_AMOUNT',
                        'timeUnit': 'DAY',
                        'amount': 300,
                        'percent': null
                    },
                    {
                        'limitationType': 'LOSS_AMOUNT',
                        'timeUnit': 'WEEK',
                        'amount': 400,
                        'percent': null
                    },
                    {
                        'limitationType': 'LOSS_AMOUNT',
                        'timeUnit': 'MONTH',
                        'amount': 500,
                        'percent': null
                    }
                ],
                'sessionLength': 600
            };

            expect(UserService.denormalizeLimits(data)).toEqual(expected);
        });

    });

});