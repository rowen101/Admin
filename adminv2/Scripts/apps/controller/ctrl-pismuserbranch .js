(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps')

.controller("ctrl.pismuserbranch", ['$stateParams', '$state', '$http', '$rootScope', '$sce', 'HttpErrorService','$AspCookie','Notification',
                                 function ($stateParams, $state, $http, $rootScope, $sce, HttpErrorService, $AspCookie, Notification) {
                                     var self = this;
                                     var username = $AspCookie.get('_214', 'fullname');


                                     self.itemsPerPage = 20;
                                     self.currentPage = 0;

                                     self.users = {};




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

                                     //select all warehouse
                                     self.onselectAll = function (p) {
                                         for (i = 0; i < p.length; i++) {
                                             p[i].isCheck = true;
                                         }
                                     }

                                     //view user warehouse
                                     //p=userId
                                     self.onViewUserWarehouse = function (p) {
                                         $http.get(coreapi + 'user/getUserWarehouse/?userId=' + p + '&sysId=20').
                                       success(function (data, status, headers, config) {
                                           self.lstWarehouse = data;
                                           console.log(self.lstWarehouse);
                                           $rootScope.openModalForm('#modal-userwarehouse');
                                       }).
                                       error(function (data, status, headers, config) {
                                           HttpErrorService.getStatus(status, data);
                                       });
                                     }

                                     //save selected user warehouse
                                     self.onSaveWarehouse = function () {
                                         self.lstWarehouse.created_by = username;
                                         $http.post(coreapi + 'user/setUserWarehouse/', self.lstWarehouse).
                                      success(function (data, status, headers, config) {
                                          Notification.success('Save Complete!');
                                          $rootScope.closeModalForm();
                                      }).
                                      error(function (data, status, headers, config) {
                                          HttpErrorService.getStatus(status, data);
                                      });
                                     }

                                     self.checkIsDefault = function (sitecode) {
                                         var list = _.where(self.lstWarehouse.userBranch, { isdefault: 1 });
                                         for (var i = 0; i < list.length; i++){
                                             if (list[i].brancode != sitecode) {
                                                 list[i].isdefault = 0
                                             }
                                         }
                                     }

                                 }]);
})(window, window.angular);


