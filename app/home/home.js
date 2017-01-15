'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'calendar',
            resolve: {
                authentication: ['calendarService', function (calendarService) {
                    return calendarService.authenticateApp();
                }]
            }
        });
    }])

    .controller('HomeCtrl', ['authentication', '$location', function (authentication, $location) {
        var self = this;
// Your Client ID can be retrieved from your project in the Google
        // Developer Console, https://console.developers.google.com
        var CLIENT_ID = '766347875707-4vk7ptblonptn2a4ml6797g9o7cd9cdl.apps.googleusercontent.com';

        var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

        self.isDataAvl = false;
        /**
         * Check if current user has authorized this application.
         */
        function init() {
            handleAuthResult(authentication);
        }

        init();

        /**
         * Handle response from authorization server.
         *
         * @param {Object} authResult Authorization result.
         */
        function handleAuthResult(authResult) {
            // var authorizeDiv = document.getElementById('authorize-div');
            if (authResult && !authResult.error) {
                // Hide auth UI, then load client library.
                self.isDataAvl = false;
                // authorizeDiv.style.display = 'none';
                $location.path("/calendar");
                // loadCalendarApi();
            } else {
                // Show auth UI, allowing the user to initiate authorization by
                // clicking authorize button.
                self.isDataAvl = true;
                // authorizeDiv.style.display = 'inline';
            }
        }

        /**
         * Initiate auth flow in response to user clicking authorize button.
         *
         * @param {Event} event Button click event.
         */
        this.handleAuthClick = function (event) {
            gapi.auth.authorize(
                {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
                handleAuthResult);
            return false;
        };
    }]);