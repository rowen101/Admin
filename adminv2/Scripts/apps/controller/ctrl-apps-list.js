(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps')
.controller('admin.apps.list', ['$stateParams', '$state', '$http', '$rootScope','HttpErrorService','filterFilter',
                function ($stateParams, $state, $http, $rootScope,HttpErrorService,filterFilter) {

                    var self = this;
                    self.appData = {};
                    self.getAppsList = function () {
                        self.systemList = [];
                        $http.get(coreapi + 'application/getapps').success(function (data, status, headers, config) {
                            self.systemList = data;

                        }).error(function (data, status, headers, config) {
                                  HttpErrorService.getStatus(status, data);

                        });
                    }


                    self.editApps = function (id) {
                        
                        self.isSuccess = false;
                        self.isError = false;
                        self.successMessage = '';
                        self.appData = filterFilter(angular.copy(self.systemList), { sysId: id })[0];            
                        self.modalTitle = "Edit Application";
                        $rootScope.openModalForm('#modal-panel-app-setup');
                    }

                    self.newApps = function () {
                        self.isSuccess = false;
                        self.isError = false;
                        self.successMessage = '';
                        self.appData.sysId = 0;
                        self.modalTitle = "New Application";
                        $rootScope.openModalForm('#modal-panel-app-setup');

                    }

                    //save application module details
                    self.saveAppsDetails = function (p) {

                        $http.post(coreapi + 'application/save-application-details/', p).success(function (response, status, headers, config) {

                                self.isSuccess = true;
                                self.isError = false;
                                self.successMessage = 'successfully saved';
                                self.getAppsList();
                        }).error(function (data, status, headers, config) {
                            HttpErrorService.getStatus(status, data);

                        });


                    };

                    self.onShowID = function (p1, p2) {
                        self.sysId = p1;
                        self.menuname = p2;
                        $('#menuname').text(p2);
                        $('#menuid').val(p1);
                        self.isError = false;
                        self.isSuccess = false;
                    };

                    //remove application
                    self.RemoveApps = function () {
                        self.sysId = $('#menuid').val();

                        $http.delete(coreapi + 'application/delete-apps/' + self.sysId).success(function (data, status, headers, config) {
                            if (!data.hasError) {
                                self.isError = false;
                                self.isSuccess = true;
                                self.successMessage = "Delete complete..";
                                self.getAppsList();

                            } else {
                                self.isSuccess = false;
                                self.isError = true;
                                self.errorMessage = data.errorMsg;
                            }

                        }).error(function (data, status, headers, config) {
                            HttpErrorService.getStatus(status, data);
                        });
                    };
                }]);
                })(window, window.angular);