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

    .controller('calendar', ['calendarData', function (calendarData) {

        var self = this;

        function init() {
            self.items = calendarData.items;
        }

        init();
    }]);