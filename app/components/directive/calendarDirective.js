'use strict';

angular.module('myApp')
    .directive('calendar', ['calendarService', function (calendarService) {
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
                obj.selectable = true;
                obj.select = function (start, end) {
                    var title = "Test";
                    var eventData;
                    if (title) {
                        eventData = {
                            title: title,
                            start: start,
                            end: end
                        };
                        setEvent(eventData, function () {
                            elem.fullCalendar('renderEvent', eventData, true); // stick? = true
                        });
                    }
                    elem.fullCalendar('unselect');
                };
                elem.fullCalendar(obj);

                function setEvent(data, cb) {
                    var event = {
                        summary: data.title,
                        start: {
                            dateTime: data.start.get(),
                            timeZone: moment.tz.guess()
                        },
                        end: {
                            dateTime: data.end.get(),
                            timeZone: moment.tz.guess()
                        }
                    };

                    var request = gapi.client.calendar.events.insert({
                        calendarId: 'primary',
                        resource: event
                    });

                    request.execute(function (evt) {
                        cb();
                        console.log(evt.htmlLink);
                    })
                }
            }
        }
    }]);