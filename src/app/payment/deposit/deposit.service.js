'use strict';

angular.module('sputnikApp.payment').service('DepositService', function($http, $filter, $angularCacheFactory, UserService, ENV, UtilsService) {

    var cache = $angularCacheFactory('depositService', {
            //maxAge: 5 * 60 * 1000
            maxAge: 1000
        }),

    self = {
            depositParameters: {
                amount: null,
                card: {
                    cardHolder: null,
                    creditCardNumber: null,
                    CVV: null,
                    expiryMonth: null,
                    expiryYear: null
                },
                neteller: {
                    account: null,
                    secureId: null,
                    accountId: null //Previous deposit account number
                },
                skrill: {
                    email: null,
                    accountId: null //Previous deposit account number
                }
            },

            bonusParameters: {
                selectedBonus: {
                    id: null
                }
            },

            depositCreditCard: function() {
                var sessionId = UserService.cookieObjects.sessionId;
                var merchantId = ENV.piqMerchantId;
                var userId = UserService.identity.id;
                var depositParameters = self.depositParameters;
                var bonusParameters = self.bonusParameters;
                var encryptedCC = UtilsService.encryptCreditCard(depositParameters.card.creditCardNumber);

                return $http({
                    method: 'POST',
                    url: ENV.piqServer + 'api/creditcard/deposit/process',
                    data: {
                        sessionId: sessionId,
                        userId: userId,
                        merchantId: merchantId,
                        amount: depositParameters.amount,
                        cardHolder: depositParameters.card.cardHolder,
                        encCreditcardNumber: encryptedCC,
                        expiryMonth: depositParameters.card.expiryMonth,
                        expiryYear: depositParameters.card.expiryYear,
                        cvv: depositParameters.card.CVV,
                        attributes: {
                            bonusId: bonusParameters.selectedBonus.id
                        }
                    }
                }).then(function(response) {
                    return response.data;
                });
            },
            depositNeteller: function() {
                var sessionId = UserService.cookieObjects.sessionId;
                var merchantId = ENV.piqMerchantId;
                var userId = UserService.identity.id;
                var depositParameters = self.depositParameters;
                var bonusParameters = self.bonusParameters;

                return $http({
                    method: 'POST',
                    url: ENV.piqServer + 'api/neteller/deposit/process',
                    data: {
                        sessionId: sessionId,
                        userId: userId,
                        merchantId: merchantId,
                        amount: depositParameters.amount,
                        account: depositParameters.neteller.account,
                        secureId: depositParameters.neteller.secureId,
                        attributes: {
                            bonusId:bonusParameters.selectedBonus.id
                        }
                    }
                }).then(function(response) {
                    return response.data;
                });
            },
            depositSkrill: function() {
                var sessionId = UserService.cookieObjects.sessionId;
                var merchantId = ENV.piqMerchantId;
                var userId = UserService.identity.id;
                var depositParameters = self.depositParameters;
                var bonusParameters = self.bonusParameters;

                return $http({
                    method: 'POST',
                    url: ENV.piqServer + 'api/skrill/deposit/process',
                    data: {
                        sessionId: sessionId,
                        userId: userId,
                        merchantId: merchantId,
                        amount: depositParameters.amount,
                        email: depositParameters.skrill.email,
                        attributes: {
                            bonusId:bonusParameters.selectedBonus.id
                        }
                    }
                }).then(function(response) {
                    return response.data;
                });
            },
            depositTrustly: function(){
                var sessionId = UserService.cookieObjects.sessionId;
                var merchantId = ENV.piqMerchantId;
                var userId = UserService.identity.id;
                var depositParameters = self.depositParameters;
                var bonusParameters = self.bonusParameters;

                return $http({
                    method: 'POST',
                    url: ENV.piqServer + 'api/bank/deposit/process',
                    data: {
                        sessionId: sessionId,
                        userId: userId,
                        merchantId: merchantId,
                        amount: depositParameters.amount,
                        attributes: {
                            bonusId:bonusParameters.selectedBonus.id
                        }
                    }
                }).then(function(response) {
                    return response.data;
                });
            },
            depositPuggplepay: function(){
                var sessionId = UserService.cookieObjects.sessionId;
                var merchantId = ENV.piqMerchantId;
                var userId = UserService.identity.id;
                var depositParameters = self.depositParameters;
                var bonusParameters = self.bonusParameters;

                return $http({
                    method: 'POST',
                    url: ENV.piqServer + 'api/pugglepay/deposit/process',
                    data: {
                        sessionId: sessionId,
                        userId: userId,
                        merchantId: merchantId,
                        amount: depositParameters.amount,
                        attributes: {
                            bonusId:bonusParameters.selectedBonus.id
                        }
                    }
                }).then(function(response) {
                    return response.data;
                });
            }

        };
    return self;
});