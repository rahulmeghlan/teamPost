'use strict';

angular.module('myApp')
    .directive('calendar', ['$location', function ($location) {
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
                    },
                    eventData = {};
                if (typeof scope.events === "undefined") {
                    $location.path("/home");
                    return;
                }
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
                    eventData = {
                        start: start,
                        end: end
                    };
                    elem.fullCalendar('renderEvent', eventData, true); // stick? = true

                    /*setEvent(eventData, function () {
                     elem.fullCalendar('renderEvent', eventData, true); // stick? = true
                     });*/
                    elem.fullCalendar('unselect');
                };
                elem.fullCalendar(obj);

                function bindEvent() {
                    scope.$on("sendInvite", function (evt, data) {
                        setEvent(data);
                    });
                }

                bindEvent();

                function setEvent(data, cb) {
                    angular.extend(eventData, data);
                    eventData.start = {
                        dateTime: eventData.start.get(),
                        timeZone: moment.tz.guess()
                    };
                    eventData.end = {
                        dateTime: eventData.end.get(),
                        timeZone: moment.tz.guess()
                    };
                    var request = gapi.client.calendar.events.insert({
                        calendarId: 'primary',
                        resource: eventData
                    });

                    request.execute(function (res) {
                        alert(res.status === "confirmed" ? "Event Updated Successfully" : "Some error occurred");
                    })
                }
            }
        }
    }]);