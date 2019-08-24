(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps')
    .controller("admin.user.list", ['$stateParams', '$state', '$http', '$rootScope', '$sce', 'HttpErrorService', 'GlobalHelper','Notification',
        function ($stateParams, $state, $http, $rootScope, $sce, HttpErrorService, GlobalHelper, Notification) {
                                     var self = this;

                                  

                                     self.itemsPerPage = 20;
                                     self.currentPage = 0;

                                     self.users = {};

                                 
                                   
                                     self.newUser = function () {
                                         $state.go('newUser', {'userId':0});
                                     }

                                     self.searchUser = function () {
                                         var spinner = new Spinner(opts).spin(spinnerTarget);
                                         $http.get(coreapi + 'user/get-search-users/?page=1&size=30&searchParam=' + $rootScope.search).
                                         success(function (data, status, headers, config) {
                                             if (!data.hasError) {
                                                 self.users = data;
                                             } else {
                                                 self.msg("Error", data.error_message, 2);
                                             }
                                         }).
                                         error(function (data, status, headers, config) {
                                             HttpErrorService.getStatus(status, data);
                                         });
                                         spinner.stop();
                                     };


                                     $rootScope.onSearch = function (p) {
                                         $rootScope.search = p;
                                         self.searchUser();
                                     }

                                     self.getUserList = function () {
                                         var spinner = new Spinner(opts).spin(spinnerTarget);
                                         $http.get(coreapi + 'user/get-all-users/?page=1&size=30').
                                         success(function (data, status, headers, config) {
                                             self.users = data;
                                         }).
                                         error(function (data, status, headers, config) {
                                             HttpErrorService.getStatus(status, data);
                                         });

                                         spinner.stop();
                                     };

                                     self.msg = function (title, msg, msgtype) {
                                         var callOutClass = '';
                                         if (msgtype == 1) {
                                             callOutClass = 'bs-callout-success';
                                         } else if (msgtype == 2)
                                         { callOutClass = 'bs-callout-danger'; }

                                         var htmltext = '<div id="callout-dropdown-positioning"  class="bs-callout ' + callOutClass + '">' +
                                     '<h4>' + title + '</h4>' +
                                     '<p>' + msg + '</p>' +
                                     '<input type="hidden" id="hresult" ng-model="resultvalue" value="2" /> </div>'
                                         self.msgResult = $sce.trustAsHtml(htmltext);
                                     };

                                     self.EditUser = function (p) {

                                         $state.go('editUser', { 'userId': p });
                                     }

                                     self.SyncUserList = function () {
                                         $http.get(coreapi + 'user/SyncUserList')
                                         .then(function (res) {
                                             GlobalHelper.Success(res.data);
                                         }, function (err) {
                                             GlobalHelper.Error(err.data);
                                         })
                                     }
                                 }]);
})(window, window.angular);


