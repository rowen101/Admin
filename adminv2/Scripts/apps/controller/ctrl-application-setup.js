(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps')

.controller('setup.appool', ['$scope', '$stateParams', '$state', '$http', '$rootScope', '$modal', '$filter', 'Upload','HttpErrorService',
    function ($scope, $stateParams, $state, $http, $rootScope, $modal, $filter, Upload, HttpErrorService) {

    $scope.showHistory = "View upload history";
    $scope.uploadHistory=[]

    $scope.$watch('files', function () {
        $scope.onUpload($scope.files);
    });

    $scope.onInit = function () {
        $scope.onShowImage();
    };

    $scope.onIntervalSet = function () {

        $http.get(coreapi + 'application/set-image-interval/?sysid=14&interval=' +$scope.ImgList.interval ).success(function (data, status, headers, config) {
            if (!data.hasError) {
                //
            } else {
                console.log('error:onShowImage \n' + data.errorMessage);
            }
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
        });

   
    };

    $scope.onShowImage = function () {
        $http.get(coreapi + 'application/get-image-list/14').success(function (data, status, headers, config) {
            if (!data.hasError) {
                $scope.ImgList = data.data;
            } else {
                console.log('error:onShowImage \n' + data.errorMessage);
            }

        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
        });
    };

    $scope.onImgSelect = function (p) {
        if (!p.fileselect) {
            return p.fileselect = true;
        } else {
            return p.fileselect = false;
        }
    }

    $scope.onSelectAll = function () {
        var index = -1;
        var comArr = eval($scope.ImgList.filePath);
        for (var i = 0; i < comArr.length; i++) {
            comArr[i].fileselect = true;
        }
    };

    $scope.onDeleteSelectedImage = function () {
        $http.post(u_applicant + 'files-delete', { p: $scope.ImgList.filePath }).success(function (data, status, headers, config) {
            if (!data.hasError) {
                $scope.onShowImage();
            } else {
                console.log('error:onDeleteSelectedImage \n' + data.errorMessage);
            }
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
        });
    };


    //upload image to database
    $scope.onUpload = function (files) {
        if (files && files.length) {
  
            $scope.dynamic = 0;

            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: u_applicant + 'files-upload',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.max = 100;
                   
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                  
                }).success(function (data, status, headers, config) {
                    
                    // console.log('file ' + config.file.name + ' uploaded. Response: ' + data);
                    $scope.dynamic = parseInt(100.0 * i / files.length);
                    $scope.uploadHistory.push({ 'file': 'file ' + config.file.name + ' uploaded.' });
                    $scope.onInit();
                });
            }

           
        }
       

    };

    $scope.onShowHistory = function (p) {
        if (p) {
            $scope.uploadLog = false;
            $scope.showHistory = "View upload history";
        } else {
            $scope.uploadLog = true;
            $scope.showHistory = "Hide upload history";
        }
    };

    }]);
})(window, window.angular);