(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps')
.controller('server.list', [ '$stateParams', '$state', '$http', '$rootScope', '$filter','Notification','HttpErrorService',
            function ($stateParams, $state, $http, $rootScope, $filter, Notification, HttpErrorService) {

                var self = this;
                self.itemsPerPage = 20;
                self.currentPage = 0;
                self.svr = {};
                self.serverList = [];

                $rootScope.onInitMenu('161800000035');

                self.onInit = function (ipage) {
                    var spinner = new Spinner(opts).spin(spinnerTarget);
                    self.currentPage = ipage;
                    $http.get(coreapi + 'server/get/?&ipg=' + self.currentPage + '&itk=' + self.itemsPerPage).success(function (response, status, headers, config) {
                        if (!response.hasError) {
                            self.serverList = response.data;
                            self.total_count = response.total_count;

                        } else {
                            Notification.error('onInit:' + response.errorMessage);
                        }
                        spinner.stop();
                    }).error(function (data, status, headers, config) {
                        HttpErrorService.getStatus(status, data);
                        spinner.stop();
                    });
                }

                self.onEdit = function (p) {
                    self.onOpenServerSetup();
                    self.svr = p;
                }
                
                self.onDelete = function (p) {

                    $rootScope.openModalForm('#modal-server-delete-confirm');
                    self.servername = p.servername;
                }

                self.onDeleteConfirn = function () {
                    $http.delete(coreapi + 'server/delete/?serverName=' + self.servername).success(function (response, status, headers, config) {
                        self.onInit(self.currentPage);
                        Notification.success('Delete Complete.');
                        $rootScope.closeModalForm();
                        spinner.stop();
                    }).error(function (data, status, headers, config) {
                        HttpErrorService.getStatus(status, data);
                        spinner.stop();
                    });
                }

                self.onOpenServerSetup = function () {
                    self.svr = {};
                    self.isTestOk = true;
                    self.testMsg = '';
                    $rootScope.openModalForm('#modal-server-setup');
                }

                self.onTest = function () {
                    var spinner = new Spinner(opts).spin(spinnerTarget);
                    self.testMsg = '';
                    $http.post(coreapi + 'server/isOk', self.svr).success(function (response, status, headers, config) {
                        if (response) {
                            self.isTestOk = true;
                            self.testMsg = 'Test connection succeded.';
                        } else {
                            self.isTestOk = false;
                            self.testMsg = 'Test connection failed.';
                        }
                        spinner.stop();
                    }).error(function (data, status, headers, config) {
                        HttpErrorService.getStatus(status, data);
                        spinner.stop();
                    });
                }

           

                self.onSave = function () {
                    var spinner = new Spinner(opts).spin(spinnerTarget);

                   
                    $http.post(coreapi + 'server/post', self.svr).success(function (response, status, headers, config) {
                        if (!response.hasError) {
                            self.onInit(self.currentPage);
                            Notification.success('Save Complete.');
                            $rootScope.closeModalForm();
                        } else {
                            Notification.error('Error:onPostQuickResponse' + response.errorMessage);
                        }
                        spinner.stop();
                    }).error(function (data, status, headers, config) {
                        HttpErrorService.getStatus(status, data);
                        spinner.stop();
                    });

                }
            }
]);
})(window, window.angular);