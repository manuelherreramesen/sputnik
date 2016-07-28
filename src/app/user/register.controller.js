'use strict';

angular.module('sputnikApp.user').controller('RegisterCtrl', function($rootScope, $scope, $filter, toastr, UserService, AvatarService) {

    $scope.ui = UserService.registration;
    $scope.ui.countries = UserService.getCountries();
    $scope.avatars = {
        types: [],
        hairs: [],
        skins: []
    };
    UserService.loadAvailableAvatars().then(function() {
        $scope.avatars.types = _.where($scope.ui.availableAvatars, {
            hairColor: 1,
            skinColor: 1
        });
    });

    // View helpers
    $scope.getCharacterName = AvatarService.getCharacterName;
    $scope.getCharacterDescription = AvatarService.getCharacterDescription;

    $scope.changeDateOfBirth = function() {
        // Bling Date of Births are stored in ISO 8601. Months in JS are index (Jan = 0)
        if ($scope.ui.dateOfBirth.day && $scope.ui.dateOfBirth.month && $scope.ui.dateOfBirth.year) {
            $rootScope.user.birthday = new Date($scope.ui.dateOfBirth.year, $scope.ui.dateOfBirth.month.value, $scope.ui.dateOfBirth.day).toISOString();
        }
    };
    $scope.changeCountry = function() {
        if ($rootScope.user.address.country.code === 'ee') {
            $scope.ui.minimumAge = 21;
        } else {
            $scope.ui.minimumAge = 18;
        }
    };

    var d, m, y;
    var startingDobYear = new Date().getUTCFullYear() - $scope.ui.minimumAge;

    // Populate DOB options
    $scope.dob = {
        days: [],
        months: [],
        years: []
    };
    for (d = 1; d <= 31; d += 1) {
        $scope.dob.days.push(d);
    }
    for (m = 0; m <= 11; m += 1) {
        $scope.dob.months.push({
            value: m,
            label: $filter('amDateFormat')(new Date(null, m), 'MMMM')
        });
    }
    for (y = startingDobYear; y >= 1900; y -= 1) {
        $scope.dob.years.push(y);
    }

    $scope.back = function(form) {
        if ($scope.ui.step > 1) {
            $scope.ui.step--;
            form.submitted = false;
        }
    };

    $scope.forward = function(form, user) {
        form.submitted = true;
        if (form.$valid) {
            $scope.ui.step++;
            form.submitted = false;
        }
    };

    $scope.completeRegistration = function(form, user) {

        form.submitted = true;

        if (form.$valid) {
            form.thinking = true;

            UserService.create(user).then(function(response) {
                $scope.ui.step++;
            }).catch(function(response) {
                switch (response.data.code) {
                    case 25:
                        toastr.error($filter('translate')('Registration is currently disabled'), $filter('translate')('Registration'));
                        break;
                    default:
                        toastr.error($filter('translate')('There was an issue registering. Please contact customer support.'), $filter('translate')('Registration'));
                        break;
                }
            }).finally(function() {
                form.thinking = false;
            });
        }
    };

    $scope.chooseAvatar = function(avatar) {
        $scope.user.avatar = avatar;

        $scope.avatars.hairs = _.where($scope.ui.availableAvatars, {
            avatarBaseTypeId: avatar.avatarBaseTypeId,
            skinColor: avatar.skinColor
        });
        $scope.avatars.skins = _.where($scope.ui.availableAvatars, {
            avatarBaseTypeId: avatar.avatarBaseTypeId,
            hairColor: avatar.hairColor
        });
    };

});