'use strict';

angular.module('sputnikApp.common').directive('dateOfBirthValidator', function(){
    return {
        require: 'ngModel',
        scope: {
            datePieces: '=',
            minAge: '='
        },
        link: function(scope, element, attrs, ctrl) {

            function getAge(day, month, year) {
                var todayDate  = new Date();
                var todayYear  = todayDate.getFullYear();
                var todayMonth = todayDate.getMonth();
                var todayDay   = todayDate.getDate();
                var age = todayYear - year;

                if (todayMonth < month - 1) {
                    age--;
                }

                if (month - 1 === todayMonth && todayDay < day) {
                    age--;
                }

                return age;
            }

            function isValid() {

                if (!angular.isObject(scope.datePieces.month)) {
                    return false;
                }

                if (getAge(scope.datePieces.day, scope.datePieces.month.value, scope.datePieces.year) < scope.minAge) {
                    return false;
                }

                return true;
            }

            scope.$watch(function() {
                return scope.minAge;
            }, function(country) {
                ctrl.$setValidity('tooYoung', isValid());
            });

            scope.$watchCollection(function() {
                return scope.datePieces;
            }, function(dob) {

                if (angular.isDefined(dob.day) && angular.isObject(dob.month) && angular.isDefined(dob.year)) {
                    ctrl.$dirty = true;
                }

                ctrl.$setValidity('tooYoung', isValid());
            });

        }
    };
});