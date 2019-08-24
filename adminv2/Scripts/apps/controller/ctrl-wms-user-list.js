  (function (window, angular, undefined) {
    'use strict';
  var app = angular.module('apps');
app.controller("wms.user.list", [ '$stateParams', '$state', '$http', '$rootScope', '$sce','Notification','HttpErrorService',
                                 function ($stateParams, $state, $http, $rootScope, $sce, Notification, HttpErrorService) {
                                     

                                     var self = this;

                                     self.wmsUserList = [];
 
                                     self.selectedTab = 'Warehouse';

                                     self.onSelect = function (p) {
                                         self.selectedTab = p;
                                     }

                                     self.getUserList = function () {
                                         var spinner = new Spinner(opts).spin(spinnerTarget);
                                         $http.get(coreapi + 'wms/get-user-list').
                                         success(function (response, status, headers, config) {
                                             if (!response.hasError) {
                                                 self.wmsUserList = response.data;
                                             } else {
                                                 self.msg("Error", response.error_message, 2);
                                             }
                                         }).
                                         error(function (data, status, headers, config) {
                                             HttpErrorService.getStatus(status, data);
                                         });

                                         spinner.stop();
                                     };

                                    

                                     self.onSetup = function (p) {
                                         self.user = angular.copy(p);
                                         self.selectedTab = 'Warehouse';
                                         $rootScope.openModalForm('#modal-user-setup');
                                     }

                                     self.onSave = function (p) {
                                         
                                         $http.post(coreapi + 'wms/post-new-user', self.user).success(function (response, status, headers, config) {
                                             if (!response.hasError) {                       
                                                 Notification.success('WMS User Update Complete.');
                                                 self.getUserList();
                                             } else {
                                                 Notification.error('onSave:' + response.errorMessage);
                                             }
                                         }).error(function (data, status, headers, config) {
                                             HttpErrorService.getStatus(status, data);
                                         });
                                     }
                                 }]);
  })(window, window.angular);