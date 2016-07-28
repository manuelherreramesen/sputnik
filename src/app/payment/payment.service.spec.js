'use strict';

describe('Service: PaymentService', function() {

    var PaymentService;

    beforeEach(function() {

        module('sputnikApp');
        inject(function(_PaymentService_) {
            PaymentService = _PaymentService_;
        });

    });
    
    describe('API Normalization', function() {

        it('should normalize withdrawal methods correctly', function() {

            var data = {
                withdrawDetailList: [{
                    withdrawReference: '8413948098250017',
                    variant: 'mc',
                    creationDate: '2014-03-14T16:10:25.000+01'
                },{
                    withdrawReference: '8413944754402745',
                    variant: 'bankTransfer_NL',
                    creationDate: '2014-03-10T19:17:20.000+01'
                }]
            };
            var expected = {
                withdrawDetailList: [{
                    withdrawReference: '8413948098250017',
                    variant: 'mc',
                    slug: 'mastercard',
                    creationDate: '2014-03-14T16:10:25.000+01'
                },{
                    withdrawReference: '8413944754402745',
                    variant: 'bankTransfer_NL',
                    slug: 'bank-transfer',
                    creationDate: '2014-03-10T19:17:20.000+01'
                }]
            };

            expect(PaymentService.normalizeWithdrawalMethods(data)).toEqual(expected);

        });

        it('should normalize deposit methods correctly', function() {

            var data = [{
                'method': 'visa',
                'depositMinAmount': 10.0,
                'depositMaxAmount': 3000.0,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'mc',
                'depositMinAmount': 10.0,
                'depositMaxAmount': 3000.0,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'bankTransfer',
                'depositMinAmount': 10.0,
                'depositMaxAmount': null,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'trustly',
                'depositMinAmount': 10.0,
                'depositMaxAmount': null,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'skrill',
                'depositMinAmount': 10.0,
                'depositMaxAmount': null,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'neteller',
                'depositMinAmount': 10.0,
                'depositMaxAmount': null,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'paysafecard',
                'depositMinAmount': 10.0,
                'depositMaxAmount': 1000.0,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }];

            var expected = [{
                'method': 'visa',
                'slug': 'visa',
                'depositMinAmount': 10.0,
                'depositMaxAmount': 3000.0,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'mc',
                'slug': 'mastercard',
                'depositMinAmount': 10.0,
                'depositMaxAmount': 3000.0,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'bankTransfer',
                'slug': 'bank-transfer',
                'depositMinAmount': 10.0,
                'depositMaxAmount': null,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'trustly',
                'slug': 'trustly',
                'depositMinAmount': 10.0,
                'depositMaxAmount': null,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'skrill',
                'slug': 'skrill',
                'depositMinAmount': 10.0,
                'depositMaxAmount': null,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'neteller',
                'slug': 'neteller',
                'depositMinAmount': 10.0,
                'depositMaxAmount': null,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }, {
                'method': 'paysafecard',
                'slug': 'paysafecard',
                'depositMinAmount': 10.0,
                'depositMaxAmount': 1000.0,
                'withdrawalMinAmount': 10.0,
                'withdrawalMaxAmount': null
            }];

            expect(PaymentService.normalizeDepositMethods(data)).toEqual(expected);
        });

        it('should add a Deposit type to deposit transactions', function() {
            var data = [
                {
                    code: 'AUTHORISATION'
                }
            ];
            var expected = [
                {
                    code: 'AUTHORISATION',
                    type: 'Deposit'
                }
            ];
            expect(PaymentService.normalizeTransactions(data)).toEqual(expected);
        });
        it('should add a Withdrawal type to deposit transactions', function() {
            var data = [
                {
                    code: 'REFUND_WITH_DATA'
                }
            ];
            var expected = [
                {
                    code: 'REFUND_WITH_DATA',
                    type: 'Withdrawal'
                }
            ];
            expect(PaymentService.normalizeTransactions(data)).toEqual(expected);
        });

    });

    describe('Bonuses', function() {
        
        it('should return the correct amount with no bonus', function() {
            var bonus = {};
            var amount = 20;
            var expected = 20;
            expect(PaymentService.getTotalAmountAfterBonus(bonus, amount)).toBe(expected);
        });
        it('should not give a bonus until minAmount has been met', function() {
            var bonus = {
                'bonusType': 'DEPOSIT',
                'percentage': 200,
                'maxAmount': 800,
                'minAmount': 20,
                'validTo': 'date',
                'toc': 'link'
            };
            var amount = 19;
            var expected = 19;
            expect(PaymentService.getTotalAmountAfterBonus(bonus, amount)).toBe(expected);
        });
        it('should not give higher than maxAmount', function() {
            var bonus = {
                'bonusType': 'DEPOSIT',
                'percentage': 200,
                'maxAmount': 800,
                'minAmount': 20,
                'validTo': 'date',
                'toc': 'link'
            };
            var amount = 2000;
            var expected = 2800;
            expect(PaymentService.getTotalAmountAfterBonus(bonus, amount)).toBe(expected);
        });

    });

});