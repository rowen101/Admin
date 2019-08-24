(function (window, angular, undefined) {
    'use strict';
Highcharts.setOptions({
    colors: ['#ffeb3b', '#03a9f4', '#8bc34a', '#c62828']
});
var app = angular.module('apps');
app.controller('ctrlDashboard', ['$stateParams', '$state', '$http', '$rootScope', '$filter', '$AspCookie', 'filterFilter','$timeout','Notification',
                             function ($stateParams, $state, $http, $rootScope, $filter, $AspCookie, filterFilter, $timeout,Notification) {
                                 
                                 $rootScope.appClass = 'dashboard-page sb-l-o sb-r-c';

                                 var userFullname = $AspCookie.get('_214', 'fullname');
                                 var userId = $AspCookie.get('_214', 'userid');
                                 
                                 var self = this;

                                
                             
                             }]);
})(window, window.angular);



