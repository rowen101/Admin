(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps')
.controller('Ctrlcoremail', ['$scope', '$stateParams', '$state', '$http', '$rootScope', '$filter','Notification','HttpErrorService',
            function ($scope, $stateParams, $state, $http, $rootScope, $filter, Notification, HttpErrorService) {

                var self = this;
                self.selectedMailId = '';
                self.itemsPerPage = 20;
                self.currentPage = 0;

                $("#toTopHover").trigger("click");


                // populate data
                self.onInit = function (ipage) {
                    var spinner = new Spinner(opts).spin(spinnerTarget);
                    self.currentPage = ipage;
                    $http.get(coreapi + 'mail/get/?&ipg=' + self.currentPage + '&itk=' + self.itemsPerPage).success(function (response, status, headers, config) {
                        if (!response.hasError) {
                            self.mailList = response.data;
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

                self.onReadMail = function (p1,p2) {
                    $("#toTopHover").trigger("click");
                    self.isView = true;
                    self.Mailbody = p1;
                    self.selectedMailId = p2;
                };
                
                self.onResend = function () {
                    var spinner = new Spinner(opts).spin(spinnerTarget);
                 
                    $http.get(coreapi + 'mail/resend/' + self.selectedMailId).success(function (response, status, headers, config) {
                        if (!response.hasError) {
                            Notification.success('Resending Email Complete.');
                            self.isView = false;
                        } else {
                            Notification.error('onResend:' + response.errorMessage);

                        }
                        spinner.stop();
                    }).error(function (data, status, headers, config) {
                        HttpErrorService.getStatus(status, data);
                        spinner.stop();
                    });
                }
            }]);
})(window, window.angular);