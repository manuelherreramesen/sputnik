'use strict';

angular.module('sputnikApp.payment').controller('DepositCtrl', function ($scope, $sce, $filter, $timeout, $routeParams, UserService, toastr, PaymentService, DepositService) {

    $scope.process = {
        step: 1,
        responseType: '',
        responseData: {
            redirectOutput: {
                url: '',
                html: ''
            }
        },
        actionUrl: null,
        thinking: false,
        iframeUrl: null,
        totalAmount: 0,
        selectedBonus: {},
        bonuses: [],
        deposit: {
            methods: [],
            success: null
        },
        chosenDepositMethod: null
    };

    $scope.iframeProperties = {
        url: null,
        parameters: []
    };

    $scope.depositParameters = DepositService.depositParameters;
    $scope.bonusParameters = DepositService.bonusParameters;
    PaymentService.process = $scope.process;
    PaymentService.iframeProperties = $scope.iframeProperties;

    $scope.prepareDeposit = function (form, depositMethod) {
        form.submitted = true;

        if (form.$valid) {
            $scope.process.chosenDepositMethod = depositMethod;
            $scope.process.thinking = true;
            $scope.process.step = 2;
        }
    };

    $scope.SubmitCC = function() {
        DepositService.depositCreditCard().then(function(data) {
            PaymentService.handleCompletedPayment(data);
        });
    };

    $scope.SubmitNeteller = function() {
        DepositService.depositNeteller().then(function(data) {
            PaymentService.handleCompletedPayment(data);
        });
    };

    $scope.SubmitSkrill = function() {
        DepositService.depositSkrill().then(function(data) {
            PaymentService.handleCompletedPayment(data);
        });
    };

    $scope.SubmitTrustly = function() {
        DepositService.depositTrustly().then(function(data) {
            PaymentService.handleCompletedPayment(data);
        });
    };

    $scope.SubmitPugglepay = function() {
        DepositService.depositPuggplepay().then(function(data) {
            PaymentService.handleCompletedPayment(data);
        });
    };

    $scope.AppendHtml = function(element) {
        var doc = element[0].contentDocument;
        doc.open();
        doc.writeln($scope.process.responseData.redirectOutput.html);
        doc.close();
    };

    $scope.selectBonus = function (bonus) {
        $scope.bonusParameters.selectedBonus = bonus;
        $scope.process.totalAmount = PaymentService.getTotalAmountAfterBonus($scope.process.selectedBonus, $scope.process.amount);
    };
    $scope.selectNoBonus = function () {
        $scope.bonusParameters.selectedBonus = {};
        $scope.process.totalAmount = PaymentService.getTotalAmountAfterBonus($scope.process.selectedBonus, $scope.process.amount);
    };

    $scope.$watch('depositParameters.amount', function (amount) {
        $scope.process.totalAmount = PaymentService.getTotalAmountAfterBonus($scope.bonusParameters.selectedBonus, amount);
    });

    PaymentService.getDepositBonuses().then(function (data) {
        $scope.process.bonuses = data;
    });

    PaymentService.getPaymentMethods('Deposit').then(function (data) {
        $scope.process.deposit = data;
    });

       //enable this to mock methods
//    PaymentService.getMockedPaymentMethods('Deposit').then(function(data) {
//        $scope.process.deposit = data;
//    });

});
