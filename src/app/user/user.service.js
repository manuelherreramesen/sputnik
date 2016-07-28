'use strict';

angular.module('sputnikApp.user').service('UserService', function($rootScope, $http, $q, $angularCacheFactory, $route, $timeout, $interval, LocaleService, toastr, ENV, COUNTRIES, UtilsService) {

    $rootScope.$on('cookie:set', function() {
        self.setSessionIdFromCookie();
    });


    var cache = $angularCacheFactory('userService');
    var self = {

        identityStorageKey: 'IDENTITY',

        // Whilst logged in, ping the server every 1 minute
        sessionTime: 60 * 1000,
        sessionTimeInterval: undefined,

        playerRefreshTime: 5 * 1000,
        playerRefreshInterval: undefined,

        // Logout after 15 minutes of inactivity (changed to 5 for audit testing)
        timeout: 15 * 60 * 1000,
        inactivityTimeout: undefined,

        identity: {
            id: null,
            firstName: null,
            lastName: null,
            emailAddress: null,
            password: null,
            nickname: null,
            birthday: null,
            level: null,
            avatar: {
                id: null,
                avatarBaseTypeId: null,
                level: null,
                skinColor: null,
                hairColor: null,
                pictureUrl: null
            },
            address: {
                street: null,
                street2: null,
                zipCode: null,
                city: null,
                state: null,
                country: undefined
            },
            language: null,
            currency: 'EUR',
            phoneNumber: null,
            receivePromotion: 'SUBSCRIBED',
            tracking: {
                version: '',
                source: '',
                medium: '',
                content: '',
                campaign: ''
            }
        },
        limits: {
            BET_AMOUNT: {
                DAY: 0,
                WEEK: 0,
                MONTH: 0
            },
            LOSS_AMOUNT: {
                DAY: 0,
                WEEK: 0,
                MONTH: 0
            },
            sessionLength: 0,
            password: null
        },
        cookie: {
            BLINGCITY_CASINO: null
        },
        cookieObjects: {
            sessionId: null
        },
        stories: [1, 10, 20, 30, 40],

        registration: {
            step: 1,
            loading: false,
            gender: 'any',
            minimumAge: 18,
            dateOfBirth: {
                day: undefined,
                month: undefined,
                year: undefined
            },
            // List of available colours (until given from BE)
            customizationOptions: {
                1: {
                    skin: {
                        1: 'f1c9be',
                        2: 'c9976e',
                        3: '5e3e35'
                    },
                    hair: {
                        1: 'd9a580',
                        2: '753a36',
                        3: '1b2035'
                    }
                },
                2: {
                    skin: {
                        1: 'f1c9be',
                        2: '5e3e35',
                        3: 'e6c882'
                    },
                    hair: {
                        1: 'd9a580',
                        2: '753a36',
                        3: '1b2035'
                    }
                },
                3: {
                    skin: {
                        1: 'f1c9be',
                        2: 'c9976e',
                        3: '5e3e35'
                    },
                    hair: {
                        1: 'a9a2a9',
                        2: 'd9a580',
                        3: '1b2035'
                    }
                },
                4: {
                    skin: {
                        1: 'f1c9be',
                        2: 'fd9b59',
                        3: '72503c'
                    },
                    hair: {
                        1: 'd9a580',
                        2: '753a36',
                        3: '1b2035'
                    }
                },
                5: {
                    skin: {
                        1: 'f1c9be',
                        2: 'c9976e',
                        3: '5e3e35'
                    },
                    hair: {
                        1: '753a36',
                        2: 'd9a580',
                        3: 'a9a2a9'
                    }
                },
                6: {
                    skin: {
                        1: 'f1c9be',
                        2: 'e6c882',
                        3: '5e3e35'
                    },
                    hair: {
                        1: 'c7a17e', // ['c7a17e', '9d5d58'],
                        2: 'e8e4dc',
                        3: '1b2035'
                    }
                },
                7: {
                    skin: {
                        1: 'f1c9be',
                        2: 'c9976e',
                        3: '5e3e35'
                    },
                    hair: {
                        1: '1b2035',
                        2: 'b74e53',
                        3: 'f2f0b1'
                    }
                },
                8: {
                    skin: {
                        1: 'f1c9be',
                        2: '5e3e35',
                        3: 'c9976e'
                    },
                    hair: {
                        1: 'd9a580',
                        2: 'b74e53',
                        3: '1b2035'
                    }
                },
                9: {
                    skin: {
                        1: 'f1c9be',
                        2: 'e6c882',
                        3: '5e3e35'
                    },
                    hair: {
                        1: '753a36',
                        2: '1b2035',
                        3: 'd9a580'
                    }
                },
                10: {
                    skin: {
                        1: 'f1c9be',
                        2: 'e6c882',
                        3: 'c9976e'
                    },
                    hair: {
                        1: 'd9a580',
                        2: '1b2035',
                        3: 'a9a2a9'
                    }
                }
            },
            availableAvatars: []
        },

        sessionFilter: {
            page: 1
        },

        load: function() {

            // Load identity from cache
            if (cache.get(self.identityStorageKey)) {
                angular.copy(JSON.parse(cache.get(self.identityStorageKey)), self.identity);
            }

            // Until we add sockets, refresh balance and session-time manually
            $interval.cancel(self.playerRefreshInterval);
            $interval.cancel(self.sessionTimeInterval);

            if (angular.isNumber(self.identity.id)) {

                self.playerRefreshInterval = $interval(function() {
                    self.refreshPlayer();
                }, self.playerRefreshTime);

                self.sessionTimeInterval = $interval(function() {
                    self.checkSessionLimit();
                }, self.sessionTime);

            }

            var d = $q.defer();
            d.resolve(self.identity);
            return d.promise;
        },

        refreshPlayer: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/players',
                data: {}
            }).then(function(response) {

                if (self.identity.wallet !== undefined && response.data.wallet !== undefined) {
                    if (!_.isEqual(self.identity.wallet, response.data.wallet)) {
                        self.refreshInactivityTimer();
                    }
                }

                angular.copy(response.data, self.identity);
                // Move this into cache as well (we need a better way of doing this like invalidating wallet?)
                cache.put(self.identityStorageKey, JSON.stringify(self.identity));

                // Emit an event to let others know that the user has changed (so we can listen for level up etc)
                $rootScope.$emit('refreshPlayer', self.identity);

                return self.identity;
            }).catch(function() {
                // There was an issue grabbing the wallet (session expired?). Throw user out
                return self.logout();
            });
        },

        setCookie: function(){
            self.cookie = UtilsService.convertCookiesToObject(document.cookie);
            $rootScope.$broadcast('cookie:set');
        },

        setSessionIdFromCookie: function() {
            self.cookieObjects.sessionId = UtilsService.getQueryVariable(self.cookie.BLINGCITY_CASINO, 'sessionId');
        },

        login: function(emailAddress, password) {
            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/players/login',
                data: 'username=' + encodeURIComponent(emailAddress) + '&password=' + encodeURIComponent(password),
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data) {
                angular.copy(data, self.identity);
                cache.put(self.identityStorageKey, JSON.stringify(self.identity));
                self.refreshInactivityTimer();
                self.setCookie();
                return self.identity;
            }).error(function() {
                return self.identity;
            });
        },

        refreshInactivityTimer: function() {

            if (!angular.isNumber(self.identity.id)) {
                return;
            }

            $timeout.cancel(self.inactivityTimeout);
            self.inactivityTimeout = $timeout(function() {
                toastr.error('You have been logged out due to inactivity.', 'Logged out');
                self.logout();
            }, self.timeout);
        },

        logout: function() {

            var guestIdentity = {
                id: null,
                currency: 'EUR'
            };

            // Clear account timeouts/intervals
            $timeout.cancel(self.inactivityTimeout);
            $interval.cancel(self.playerRefreshInterval);
            $interval.cancel(self.sessionTimeInterval);

            // Logout via API first
            $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/players/logout',
                params: {
                    playerId: self.identity.id
                },
                data: {}
            });
            cache.remove(self.identityStorageKey);

            $route.reload();

            angular.copy(guestIdentity, self.identity);
            return self.identity;
        },

        create: function(user) {

            // Remove and alter before registration
            delete user.confirmPassword;
            delete user.termsConditions;

            user.language = LocaleService.getAccountFriendlyLanguage();
            if (user.address.country.code !== undefined) {
                user.address.country = user.address.country.code.toUpperCase();
            } else {
                user.address.country = user.address.country.toUpperCase();
            }

            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/players',
                data: user
            }).success(function() {
                // Right now we need to leave the user logged out, for him to activate via email
                //angular.copy(data, self.identity);
                //return self.identity;
            });
        },

        update: function(user) {

            var oldPassword = user.password;
            var newPassword = user.newPassword;

            delete user.password;
            delete user.newPassword;
            delete user.confirmPassword;

            return $http({
                method: 'PUT',
                url: ENV.apiEndpoint + '/players',
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    password: oldPassword,
                    newPassword: newPassword
                }
            });
        },

        verifyEmail: function(code) {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/players/verify/' + code,
                data: {}
            }).then(function(response) {
                return response.data;
            });
        },

        forgotPassword: function(emailAddress) {
            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/players/password/reset/create',
                data: {
                    emailAddress: emailAddress
                }
            });
        },

        resetPassword: function(uuid, password) {
            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/players/password/reset',
                data: {
                    uuid: uuid,
                    password: password
                }
            }).then(function(response) {
                return response.data;
            });
        },

        getGameSessions: function(dateFrom, dateTo) {

            var date = new Date();
            var filter = angular.copy(self.sessionFilter);
            filter.page = filter.page - 1;
            filter.endDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

            if (typeof filter.startDate === 'undefined') {
                date.setDate(date.getDate() - 300);
                filter.startDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            }

            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/games/session',
                params: filter,
                data: {},
                cache: cache
            }).then(function(response) {
                return response.data;
            });
        },

        /**
         * Rework the limits to be easier to use for angular
         */
        normalizeLimits: function(data) {
            var limits = {
                BET_AMOUNT: {
                    DAY: 0,
                    WEEK: 0,
                    MONTH: 0
                },
                LOSS_AMOUNT: {
                    DAY: 0,
                    WEEK: 0,
                    MONTH: 0
                },
                sessionLength: data.sessionLength
            };

            angular.forEach(data.limitList, function(limit) {
                limits[limit.limitationType][limit.timeUnit] = limit.amount;
            });

            return limits;
        },

        /**
         * Loop through our limits object and reassign it back to the format we want
         */
        denormalizeLimits: function(data) {
            var limits = {
                limitList: [],
                sessionLength: data.sessionLength === 0 ? undefined : data.sessionLength
            };

            angular.forEach(data, function(limit, limitType) {
                if (angular.isObject(limit)) {
                    angular.forEach(limit, function(amount, timeUnit) {
                        if (angular.isDefined(amount) && amount !== null && amount !== 0) {
                            limits.limitList.push({
                                limitationType: limitType,
                                timeUnit: timeUnit,
                                amount: amount,
                                percent: null
                            });
                        }
                    });
                }
            });

            return limits;
        },

        getLimits: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/players/limit',
                data: {}
            }).then(function(response) {
                var limits = self.normalizeLimits(response.data);
                angular.copy(limits, self.limits);
                return self.limits;
            });
        },

        setLimits: function(password) {
            var data = self.denormalizeLimits(self.limits);
            var exclusionDays = self.limits.exclusion;

            data.password = password;

            delete self.limits.exclusion;

            return $http({
                method: 'PUT',
                url: ENV.apiEndpoint + '/players/limit',
                data: data
            }).then(function(response) {

                // User has set some limits, let's reset his session checking timer
                $interval.cancel(self.sessionTimeInterval);
                self.sessionTimeInterval = $interval(function() {
                    self.checkSessionLimit();
                }, self.sessionTime);

                // Check if player is trying to exclude themselves
                if (angular.isDefined(exclusionDays) && exclusionDays !== null && exclusionDays.length !== 0) {
                    self.exclude(exclusionDays);
                }

                return response.data;
            });
        },

        exclude: function(amountOfDays) {
            return $http({
                method: 'POST',
                url: ENV.apiEndpoint + '/players/block?days=' + amountOfDays,
                data: {}
            }).then(function() {
                self.logout();
            });
        },

        /**
         * Ping API that a minute has passed. If they tell us the player is blocked, log the player out.
         */
        checkSessionLimit: function() {
            return $http({
                method: 'PUT',
                url: ENV.apiEndpoint + '/players/sessionTime',
                data: {}
            }).then(function(response) {
                if (response.data.blocked === true) {
                    self.logout();
                }
            });
        },

        getSession: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/players/session',
                data: {}
            }).then(function(response) {
                return response.data;
            });
        },

        getLevels: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/levels',
                data: {},
                cache: cache
            }).then(function(response) {
                return response.data;
            });
        },

        loadAvailableAvatars: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/avatars/signup',
                data: {},
                cache: cache
            }).success(function(data) {
                angular.copy(data, self.registration.availableAvatars);
                return self.registration.availableAvatars;
            });
        },

        getUnlockedStories: function() {

            var stories = [];

            if (!angular.isNumber(self.identity.id)) {
                return stories;
            }

            angular.forEach(self.stories, function(value) {
                if (self.identity.level.level >= value) {
                    stories.push(value);
                    return false;
                }
            });

            return stories;
        },

        fetchAllStories: function(force) {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/avatars/history?night=' + self.isNightTime(),
                data: {},
                cache: force ? false : cache
            }).then(function(response) {
                return response.data;
            });
        },

        isNightTime: function() {

            var hours = new Date().getHours();

            return !!(hours >= 18 || hours <= 6);
        },

        getLatestStoryPicture: function() {
            var stories = self.getUnlockedStories();
            var latestStory = stories[stories.length-1];
            return (self.isNightTime()) ? latestStory + '-night.png' : latestStory + '-day.png';
        },

        getCorrectLevelPicture: function() {
            var currentLevel = self.identity.level.level;
            var currentLevelString = currentLevel.toString().substring(1);

            var comparingLevel = 0;
            if (currentLevelString === '') {
                comparingLevel = currentLevel;
            } else {
                comparingLevel = parseInt(currentLevelString);
            }

            switch(comparingLevel) {
                case 1:
                    return currentLevel;
                case 2:
                    return currentLevel;
                case 3:
                    return currentLevel-1;
                case 4:
                    return currentLevel-2;
                case 5:
                    return currentLevel;
                case 6:
                    return currentLevel-1;
                case 7:
                    return currentLevel-2;
                case 8:
                    return currentLevel;
                case 9:
                    return currentLevel-1;
            }

        },

        getCountries: function() {
            return COUNTRIES;
        },

        fetchAllItems: function() {
            return $http({
                method: 'GET',
                url: ENV.apiEndpoint + '/items',
                data: {}
            }).then(function(response) {
                return response.data;
            });
        },

        useItem: function(item) {
            var d = $q.defer();

            $http({
                method: 'PUT',
                url: ENV.apiEndpoint + '/items/' + item.id,
                data: {}
            }).then(function(response) {
                d.resolve(response.data);
            });
            return d.promise;
        }
    };



    return self;
});
