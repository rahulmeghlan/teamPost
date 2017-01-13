'use strict';

angular.module('myApp')
    .directive('calendar', [function () {
        return {
            restrict: "E",
            link: function (scope, elem, attr) {
                elem.fullCalendar();
            }
        }
    }]);