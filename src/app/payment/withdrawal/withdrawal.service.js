'use strict';

angular.module('sputnikApp.payment').service('WithdrawalService', function($http, $filter, $angularCacheFactory, UserService, ENV) {

    var cache = $angularCacheFactory('withdrawalService', {
            //maxAge: 5 * 60 * 1000
            maxAge: 1000
        }),

        self = {

//            withdrawalParameters: {
//                amount: null
//            },

            doWithdrawal: function(withdrawalType) {
                var sessionId = UserService.cookieObjects.sessionId;
                var merchantId = ENV.piqMerchantId;
                var userId = UserService.identity.id;
                var withdrawalParameters = self.withdrawalParameters;

                return $http({
                    method: 'POST',
                    url: ENV.piqServer + 'api/' + withdrawalType + '/withdrawal/process',
                    data: {
                        sessionId: sessionId,
                        userId: userId,
                        merchantId: merchantId,
                        amount: withdrawalParameters.amount,
                        accountId: withdrawalParameters.accountId
                    }
                }).then(function(response) {
                    return response.data;
                });
            },
        };
    return self;
});