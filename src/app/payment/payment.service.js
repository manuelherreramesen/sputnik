'use strict';

angular.module('sputnikApp.payment').service('PaymentService', function($http, $filter, $angularCacheFactory, UserService, ENV, DepositService, $sce) {

    var cache = $angularCacheFactory('paymentService', {
        //maxAge: 5 * 60 * 1000
        maxAge: 1000
    }),

    self = {

        adyenSlugMappings: {
            card: 'visa',
            visa: 'visa',
            mc: 'mastercard',
            ideal: 'ideal',
            paysafecard: 'paysafecard',
            moneybookers: 'skrill',
            skrill: 'skrill',
            trustly: 'trustly',
            bankTransfer: 'bank-transfer',
            'bankTransfer_SE': 'bank-transfer',
            'bankTransfer_NL': 'bank-transfer',
            'bankTransfer_IBAN': 'bank-transfer',
            'bankTransfer_GB': 'bank-transfer',
            neteller: 'neteller',
            directEbanking: 'direct-ebanking',
            giropay: 'giropay',
            dotpay: 'dotpay'
        },
        transactionFilter: {
            page: 1
        },

        actionUrl: null,

        deposit: function(method, amount, selectedBonus) {
            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/payments/deposit',
                data: {
                    paymentMethod: method,
                    amount: amount,
                    skin: ENV.adyenSkin,
                    bonusId: selectedBonus.id
                }
            }).then(function(response) {
                return response.data;
            });
        },

        withdraw: function(reference, variant, amount, password) {
            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/payments/withdraw',
                data: {
                    withdrawReference: reference,
                    paymentMethod: variant,
                    amount: amount,
                    password: password
                }
            }).then(function(response) {
                // Update wallet
                UserService.refreshPlayer();
                return response.data;
            });
        },

        withdrawBankTransfer: function(transfer) {
            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/payments/bank',
                data: {
                    iban: transfer.iban,
                    bic: transfer.bic,
                    bankName: transfer.bankName,
                    name: transfer.name
                }
            }).then(function(response) {
                // Update wallet
                UserService.refreshPlayer();
                return response.data;
            });
        },

        getConversionRates: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/credits/rates',
                data: {},
                cache: cache
            }).then(function(response) {
                return response.data;
            });
        },

        convertCredits: function(amount, conversionType) {
            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/credits/convert',
                data: {
                    creditAmount: amount,
                    conversionType: conversionType
                }
            }).then(function(response) {
                return response.data;
            });
        },

        /**
         * For adding angular-convenience data like slugs
         */
        normalizeWithdrawalMethods: function(data) {

            angular.forEach(data.withdrawDetailList, function(method) {
                method.slug = self.adyenSlugMappings[method.variant];
            });

            if (data.storeBankAccount) {
                data.withdrawDetailList.push({
                    variant: 'bank-transfer',
                    slug: 'bank-transfer'
                });
            }

            return data;
        },

        /**
         * For adding angular-convenience data like slugs
         */
        normalizeDepositMethods: function(methods) {
            angular.forEach(methods, function(method) {
                method.slug = self.adyenSlugMappings[method.method];
            });
            return methods;
        },

        /**
         * For adding the type of transaction (withdrawal/deposit)
         */
        normalizeTransactions: function(transactions) {
            angular.forEach(transactions, function(transaction) {
                var type = 'Deposit', status = 'Success';
                if (transaction.code === 'REFUND_WITH_DATA' || transaction.code === 'REFUND' || transaction.code === 'BACK_OFFICE_MONEY_WITHDRAW') {
                    type = 'Withdrawal';
                }
                transaction.type = type;
                if (transaction.status === 'FAILURE') {
                    status = 'Failed';
                } else if (transaction.status === 'CANCELED') {
                    status = 'Cancelled';
                } else if (transaction.status === 'AWAITING_APPROVAL') {
                    status = 'Pending Approval';
                } else if (transaction.status === 'AWAITING_NOTIFICATION') {
                    status = 'Pending';
                } else if (transaction.status === 'SENDING_FAILURE') {
                    status = 'Failed';
                } else if (transaction.status === 'DECLINED') {
                    status = 'Declined';
                } else if (transaction.status === 'REFUNDED') {
                    status = 'Refunded';
                }
                transaction.status = status;
            });
            return transactions;
        },

        getDepositBonuses: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/bonuses/deposit',
                data: {}
            }).then(function(response) {
                return response.data;
            });
        },

        getPlayerBonuses: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/bonuses',
                data: {}
            }).then(function(response) {
                return response.data;
            });
        },

        cancelPlayerBonus: function (id) {
            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/bonuses/cancel/' + id,
                data: {}
            }).then(function (response) {
                return response.data;
            });
        },

        getPaymentMethods: function(paymentMethod) {
            var sessionId = UserService.cookieObjects.sessionId;
            var merchantId = ENV.piqMerchantId;
            var userId = UserService.identity.id;

            return $http({
                method: 'GET',
                url: ENV.piqServer + 'api/user/payment/method/' + merchantId + '/' + userId,
                params: {
                    sessionId: sessionId,
                    method: paymentMethod
                },
                cache: cache
            }).then(function(response) {
                return response.data;
            });
        },

        //Temp mocking for 'getUserPaymentMethods' to display deposit methods
        getMockedPaymentMethods: function(paymentMethod) {
            return $http({
                method: 'GET',
                url: '/app/payment/mock-payment/user-payment-methods.json',
                data: {}
            }).then(function(response) {
                return response.data;
            });
        },

        getTotalAmountAfterBonus: function(bonus, amount) {
            if (!angular.isNumber(amount)) {
                return 0;
            }
            if (!angular.isDefined(bonus.bonusType)) {
                return amount;
            }
            if (angular.isNumber(bonus.minAmount) && amount < bonus.minAmount) {
                return amount;
            }

            var extraAmount = (bonus.percentage / 100) * amount;
            if (angular.isNumber(bonus.maxAmount) && extraAmount > bonus.maxAmount) {
                extraAmount = bonus.maxAmount;
            }

            return amount + extraAmount;
        },

        fetchAll: function() {

            var date = new Date();
            var filter = angular.copy(self.transactionFilter);
            filter.page = filter.page - 1;
            filter.endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

            if (typeof filter.startDate === 'undefined') {
                date.setDate(date.getDate() - 300);
                filter.startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            }

            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/payments',
                params: filter,
                data: {},
                cache: cache
            }).then(function(response) {
                response.data.transactions = self.normalizeTransactions(response.data.transactions);
                return response.data;
            });
        },

        fetch: function(id) {

            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/payments/' + id,
                data: {},
                cache: cache
            }).then(function(response) {
                return response.data;
            });
        },


        //PQ methods.

        getSessionIdPQ: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + 'payments/uuid',
                data: {}
            }).then(function(response) {
                return response.data;
            });
        },

        handleCompletedPayment: function(data) {
            if (data.success) {
                self.handleSuccessPayment(data);
            } else {
                self.handleFailedPayment(data);
            }
        },

        handleSuccessPayment: function(data) {
            if (data.redirectOutput){
                self.handleRedirectedResponse(data);
            } else {
                self.process.step = 3;
                self.process.responseType = 'basic';
                self.process.responseData = data;
            }
        },

        handleRedirectedResponse: function(data) {
            if (_.contains(data, 'html')){
                self.handleRedirectedHtmlResponse(data);
            } else {
                self.handleRedirectedParameterResponse(data);
            }
        },

        handleRedirectedHtmlResponse: function(data) {

        },

        handleRedirectedParameterResponse: function(data) {
            if (data.redirectOutput.container === 'iframe') {
                self.process.step = 3;

                if (data.redirectOutput.html) {
                    self.process.responseType = 'iframeWithHtml';
                    self.process.responseData.redirectOutput.html = data.redirectOutput.html;
                } else {
                    self.process.responseType = 'iframe';
                }

                if (!_.isEmpty(data.redirectOutput.parameters)) {
                    var parameters = data.redirectOutput.parameters;
                    var parameterArray = [];
                    for (var parameter in parameters) {
                        if (parameters.hasOwnProperty(parameter)) {
                            var parameterObject = {
                                key: parameter,
                                value: parameters[parameter]
                            };
                            parameterArray.push(parameterObject);
                        }
                    }
                    self.iframeProperties.parameters = parameterArray;
                }

                if (data.redirectOutput.url) {
                    self.iframeProperties.url = data.redirectOutput.url;
                    self.iframeProperties.url = $sce.trustAsResourceUrl(self.iframeProperties.url);
                }

                self.iframeProperties.methodType = data.redirectOutput.method;
            } else {

            }
        },

        handleFailedPayment: function(data) {

        }
    };

    return self;
});
