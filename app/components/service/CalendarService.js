/**
 * Created by rahul.meghlan on 1/11/2017.
 */
angular.module('myApp')
    .service('calendarService', ['$q', function ($q) {
        var self = this;

        self.authenticateApp = function () {
            var defer = $q.defer(),
                CLIENT_ID = '766347875707-4vk7ptblonptn2a4ml6797g9o7cd9cdl.apps.googleusercontent.com',
                SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

            checkAndAuthenticateGALoad();

            function checkAndAuthenticateGALoad() {
                if (typeof gapi.auth === "undefined") {
                    var timer = setTimeout(function () {
                        clearTimeout(timer);
                        checkAndAuthenticateGALoad(defer);
                    }, 1000);
                } else {
                    gapi.auth.authorize(
                        {
                            'client_id': CLIENT_ID,
                            'scope': SCOPES.join(' '),
                            'immediate': true
                        }, function (res) {
                            defer.resolve(res);
                        }, function (res) {
                            defer.reject(res);
                        });
                }
            }

            return defer.promise;


        };


    }]);