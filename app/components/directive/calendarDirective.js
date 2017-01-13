'use strict';

angular.module('myApp')
    .directive('calendar', [function () {
        return {
            restrict: "E",
            scope: {
                events: "="
            },
            link: function (scope, elem, attr) {
                var obj = {
                    defaultView: 'agendaWeek',
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    }
                };
                if (scope.events.length) {
                    obj.events = [];
                    angular.forEach(scope.events, function (val, index) {
                        obj.events.push({
                            title: val.summary,
                            start: new Date(val.start.dateTime),
                            end: new Date(val.end.dateTime)
                        });
                    });
                }
                console.log(scope.events);
                elem.fullCalendar(obj);
            }
        }
    }]);