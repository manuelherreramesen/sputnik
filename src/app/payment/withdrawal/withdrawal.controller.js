'use strict';

angular.module('sputnikApp.payment').controller('WithdrawalCtrl', function($scope, $filter, ngTableParams, PaymentService, UserService, toastr, $modal, WithdrawalService) {

    $scope.process = {
        step: 1,
        thinking: false,
        method: null,
        withdrawal: {
            methods: [],
            success: null
        }
    };
    $scope.transfer = {
        name: UserService.identity.firstName + ' ' + UserService.identity.lastName,
        iban: '',
        bic: '',
        bankName: ''
    };
    $scope.withdrawalParameters = {
        amount: null,
        accountId: null
    };

    PaymentService.process = $scope.process;

    PaymentService.getPaymentMethods('Withdrawal').then(function (data) {
        $scope.process.withdrawal = data;
        //$scope.hasBonuses = ($scope.process.response.playerBonuses.length > 0);
    });
    
    $scope.bonusTotalAmount = 0.00;
    $scope.hasBonuses = false;
    
    $scope.modal = $modal({
        scope: $scope,
        template: '/app/payment/withdrawal-bonus-warning.tpl.html',
        show: false
    });
    
    $scope.close = function() {
        $scope.modal.hide();
    };
    
    $scope.accept = function() {
        if ($scope.hasBonuses){$scope.close();}
        
        var form = $scope.process.form;
        form.submitted = true;
        if (form.$valid) {

            $scope.process.thinking = true;
            var method = $scope.process.method;

            if (method === 'CREDITCARD') {
                SubmitWithdrawal('creditcard');
            } else if (method === 'NETELLER') {
                SubmitWithdrawal('neteller');
            } else if (method === 'TRUSTLY') {
                SubmitWithdrawal('trustly');
            } else if (method === 'EUTELLER') {
                SubmitWithdrawal('euteller');
            } else if (method === 'SKRILL') {
                SubmitWithdrawal('skrill');
            }

//            if (method.slug === 'bank-transfer' && $scope.process.response.storeBankAccount && method.withdrawReference === undefined) {
//                $scope.process.step++;
//            } else {
//                PaymentService.withdraw(method.withdrawReference, method.variant, method.amount, method.password).then(function(data) {
//                    $scope.process.step++;
//                }).catch(function(response) {
//                    switch (response.data.code) {
//                        case 3:
//                            toastr.error($filter('translate')('The password provided is incorrect'), $filter('translate')('Withdrawal'));
//                            break;
//                        case 11:
//                            toastr.error($filter('translate')('You cannot withdraw more than what is in your wallet'), $filter('translate')('Withdrawal'));
//                            break;
//                        case 15:
//                            toastr.error($filter('translate')('In order to withdraw that amount you need to provide us with documents to kyc@blingcity.com'), $filter('translate')('Withdrawal'));
//                            break;
//                        default:
//                            toastr.error($filter('translate')('There was an issue with your withdrawal'), $filter('translate')('Withdrawal'));
//                            break;
//                    }
//                }).finally(function() {
//                    $scope.process.thinking = false;
//                });
//            }
        }

    };

    var SubmitWithdrawal = function(withdrawalType) {
        WithdrawalService.doWithdrawal(withdrawalType).then(function(data) {
            PaymentService.handleCompletedPayment(data);
        });
    };

    $scope.start = function(form, method, accountId) {
        $scope.process.method = method;
        $scope.process.form = form;
        this.withdrawalParameters.accountId = accountId;
        WithdrawalService.withdrawalParameters = this.withdrawalParameters;

        if ($scope.hasBonuses){
            $scope.modal.$promise.then($scope.modal.show);
        } else {
            $scope.accept();
        }
    };

    $scope.provideBankDetails = function(form, transfer) {
        form.submitted = true;
        if (form.$valid) {
            $scope.process.thinking = true;
            PaymentService.withdrawBankTransfer(transfer).then(function() {
                $scope.process.step++;
            }).finally(function() {
                $scope.process.thinking = false;
            });
        }
    };

    /* jshint ignore:start */
    $scope.pendingWithdrawals = new ngTableParams({
        page: 1,
        count: 10,
        sorting: {
            id: 'desc'
        }
    }, {
        counts: [],
        getData: function ($defer, params) {
            PaymentService.fetchAll().then(function (data) {
                params.total(data.count);
                $defer.resolve(data.transactions);
            });
        }
    });
    /* jshint ignore:end */

});
