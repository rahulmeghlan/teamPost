'use strict';

angular.module('myApp.calendarView', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/calendar', {
            templateUrl: 'calendar/calendar.html',
            controller: 'calendar',
            controllerAs: 'calendarData',
            resolve: {
                calendarData: ['calendarService', function (calendarService) {
                    return calendarService.loadCalendar();
                }]
            }
        });
    }])

    .controller('calendar', ['calendarData', '$scope', '$rootScope', function (calendarData, $scope, $rootScope) {

        var self = this;

        function init() {
            self.items = calendarData.items;
            self.inviteInProgress = false;
        }

        self.submitForm = function () {
            var evt = $scope.$broadcast("sendInvite", {
                summary: self.title,
                location: self.location,
                description: self.desc
            });
            $scope.$on("destroy", evt);
        };

        init();
    }]);