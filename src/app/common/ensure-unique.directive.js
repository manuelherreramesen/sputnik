'use strict';

angular.module('sputnikApp.common').directive('ensureUnique', function($http, $timeout, ENV) {
    return {
        require: 'ngModel',
        link: function(scope, ele, attrs, ctrl) {

            var timeout;

            scope.$watch(attrs.ngModel, function(value) {
                
                if (!value) {
                    return;
                }
                if (timeout) {
                    $timeout.cancel(timeout);
                }

                var type = attrs.ensureUnique;
                var data = {};
                data[attrs.ensureUnique] = value;

                if (type === 'emailAddress') {
                    type = 'email';
                }

                timeout = $timeout(function() {
                    $http({
                        method: 'POST',
                        url: ENV.apiEndpoint + '/players/validate/' + type,
                        data: data
                    }).success(function(data, status, headers, cfg) {
                        ctrl.$setValidity('unique', data.valid);
                    }).error(function(data, status, headers, cfg) {
                        ctrl.$setValidity('unique', false);
                    });
                }, 250);

            });
        }
    };
});