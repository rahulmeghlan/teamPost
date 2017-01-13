'use strict';

angular.module('myApp.calendarView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/calendar', {
    templateUrl: 'calendar/calendar.html',
    controller: 'calendar'
  });
}])

.controller('calendar', [function() {

}]);