'use strict';

/**
 * Note: this is used in responsible-gaming.tpl.html rather than within a top-level view
 */
angular.module('sputnikApp.help').controller('ResponsibleGamingCtrl', function($scope, $filter, UserService, toastr) {

	$scope.setLimits = function(form, limit) {
		if (form.$valid) {
			UserService.setLimits(limit.password).then(function(response) {
				toastr.success($filter('translate')('You have successfully set limits on your account.'), $filter('translate')('Limits'));
				form.password.$setValidity('password', true);
			}).catch(function(response) {
				// Innocent until proven otherwise
				form.password.$setValidity('password', true);

				// Check if theres an errors object for password issues
				if (typeof response.data.errors !== 'undefined' && typeof response.data.errors.password !== 'undefined') {
					form.password.$setValidity('password', false);
				} else {
					// Not a password problem, display the error message in a toastr
					if (typeof response.data.code !== 'undefined') {
						toastr.error($filter('translate')('You cannot increase your limits'), $filter('translate')('Limits'));
					}
				}
			});
		}
	};

	if (UserService.identity.id !== null) {
		$scope.limits = UserService.limits;
		$scope.ui = {
			correctPassword: false,
			limits: {
				bet: {
					password: '',
					selected: undefined,
					options: [
						{ label: 'Day', value: 'DAY' },
						{ label: 'Week', value: 'WEEK' },
						{ label: 'Month', value: 'MONTH' }
					]
				},
				loss: {
					password: '',
					selected: undefined,
					options: [
						{ label: 'Day', value: 'DAY' },
						{ label: 'Week', value: 'WEEK' },
						{ label: 'Month', value: 'MONTH' }
					]
				},
				session: {
					password: ''
				},
				exclusion: {
					password: '',
					selected: undefined,
					options: [
                        { label: 'Next 24 Hours', value: 1 },
                        { label: 'Next 7 Days', value: 7 },
                        { label: 'Next Month', value: 30 }
					]
				},
			}
		};

		$scope.ui.limits.bet.selected = $scope.ui.limits.bet.options[0];
		$scope.ui.limits.loss.selected = $scope.ui.limits.loss.options[0];

		UserService.getLimits();
	}

});
