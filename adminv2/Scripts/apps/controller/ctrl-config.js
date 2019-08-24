(function (window, angular, undefined) {
    'use strict';

    var app = angular.module('apps');
    app.controller('ctrlConfig', ['$stateParams', '$state', '$http', '$rootScope', '$filter', '$AspCookie', 'filterFilter', '$timeout', 'Notification',
        function ($stateParams, $state, $http, $rootScope, $filter, $AspCookie, filterFilter, $timeout, Notification) {

   

            var userFullname = $AspCookie.get('_214', 'fullname');
            var userId = $AspCookie.get('_214', 'userid');

            var self = this;



        }]);

})(window, window.angular);