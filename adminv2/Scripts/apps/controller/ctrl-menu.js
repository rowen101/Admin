(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps')
.controller('admin.menu.list', ['$scope', '$stateParams', '$state', '$http', '$rootScope', '$filter','HttpErrorService',
            function ($scope, $stateParams, $state, $http, $rootScope, $filter, HttpErrorService) {
                
                $("#toTopHover").trigger("click");
                $scope.sysId = $stateParams.appsID;
                $scope.drpAppsCaption = "Select System";


                $scope.getApps = function () {
                    var spinner = new Spinner(opts).spin(spinnerTarget);
                    $scope.systemList = [];
                    $http.get(coreapi + 'application/GetApplicationActive/').success(function (data, status, headers, config) {
                        spinner.stop();
                        $scope.systemList = data;


                        for (var i = 0; i < $scope.systemList.length; i++) {
                            if ($scope.systemList[i].sysId == $scope.sysId) {
                                $scope.selectApps($scope.systemList[i].sysId, $scope.systemList[i].sysname);
                                break;
                            }
                        }



                    }).error(function (data, status, headers, config) {
                               HttpErrorService.getStatus(status, data);
                        spinner.stop();               
                    });
                };

                $scope.onShowID = function (p1, p2) {
                    $scope.menuid = p1;
                    $scope.menuname = p2;
                    $('#menuname').text(p2);
                    $('#menuid').val(p1);
                };

                $scope.RemoveMenu = function () {
                    $scope.menuid = $('#menuid').val();
                    $http.get(coreapi + 'Menu/DeleteMenu/' + $scope.menuid).success(function (data, status, headers, config) {
                     
                            $scope.isError = false;
                            $scope.isSuccess = true;
                            $scope.successMessage = "Delete complete..";

                            $scope.selectApps($scope.sysId, $scope.drpAppsCaptio);//refresh data

                      

                    }).error(function (data, status, headers, config) {
                        HttpErrorService.getStatus(status, data);
                    });
                };

                $scope.selectApps = function (appsID, appsDescription) {
                    var spinner = new Spinner(opts).spin(spinnerTarget);
                    if (appsID != null || appsID != '') {

                        $scope.menuList = [];
                        $http.get(coreapi + 'menu/GetMenubyAppsID/?id=' + appsID).success(function (data, status, headers, config) {
                            spinner.stop();
                            $scope.sysId = appsID;
                            $scope.menuList = data;
                            $scope.drpAppsCaption = appsDescription;


                        }).error(function (data, status, headers, config) {
                            HttpErrorService.getStatus(status, data);
                            spinner.stop();
                        });
                    }
                }

                $scope.editMenu = function (id) {

                    $state.go('editMenu', { 'menuID': id, 'sysId': $scope.sysId });
                }

                $scope.newMenu = function () {

                    $state.go('newMenu')
                    console.clear();
                    console.log('test' + $scope.sysId);
                }




            }])

.controller('admin.menu.setup', ['$scope', '$stateParams', '$state', '$http','HttpErrorService',
    function ($scope, $stateParams, $state, $http,HttpErrorService) {
        
    $("#toTopHover").trigger("click");

    $scope.MenuData = {}
    $scope.menuID = $stateParams.menuID;
    $scope.MenuData.sysId = $stateParams.sysId;
    $scope.systemList = [];
    $scope.MenuType = [];
 
    var selectesysId;

    $scope.parentMenuList = [];

    

    $scope.onCreateNew = function () {
        $scope.isError = false;
        $scope.isSuccess = false;
        $scope.MenuData = {};
        $scope.parentMenuList = [];
        $scope.selectesysId = $scope.MenuData.sysId;
        $scope.getParentMenu($scope.MenuData.sysId);
    }

    /*
    @ go back to menu list page
    */
    $scope.Menulist = function () {
        
        $state.go('MenuList', { 'appsID': $scope.MenuData.sysId });
    }


    $scope.getParentMenu = function (paramId) {
        $scope.parentMenuList.push({ menucode: 0, menuname: 'As Parent' });
        $http.get(coreapi + 'menu/GetParentMenu/' + paramId).success(function (data, status, headers, config) {
            
           
            for ($scope.imenu = 0; $scope.imenu <= data.length - 1; $scope.imenu++) {
                $scope.parentMenuList.push(data[$scope.imenu]);
            }
           
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
        });

    }


    $scope.getAppsDetails = function () {

        /*
        @ get active application
        */
        $http.get(coreapi + 'application/GetApplicationActive/').success(function (data, status, headers, config) {
            $scope.systemList = data;
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
        });

        /*
        @ get menu type
        */
        $http.get(coreapi + 'status/getstatus/?accessValue=MENUTYPE').success(function (data, status, headers, config) {
            $scope.MenuType = data;
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
        });


        //initialize module add/edit
        if ($scope.menuID === undefined) {
            $scope.iconform = 'glyphicons glyphicons-circle_plus';
            $scope.titleform = 'New Menu';
            $scope.isNew = true;
            $scope.MenuData.menuId = 0;
        } else {
            $scope.iconform = 'glyphicon glyphicon-edit';
            $scope.titleform = 'Update Menu';
            $scope.onGetMenuDetails();
            $scope.isNew = false;
        }
    }

    //get menu details
    $scope.onGetMenuDetails = function () {
        $http.get(coreapi + 'menu/GetMenubyId/?id=' + $scope.menuID + '&sysId=' + $scope.MenuData.sysId).success(function (data, status, headers, config) {
            $scope.MenuData = data;
            selectesysId = $scope.MenuData.sysId;
            $scope.getParentMenu(data.sysId);

        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);
        });
    };

    /*
    @ change application event
    */
    $scope.changeApps = function () {
        $scope.parentMenuList = [];
        $scope.selectesysId = $scope.MenuData.sysId;
        $scope.getParentMenu($scope.MenuData.sysId);
    };

     //save menu
    $scope.onSaveChange = function () {

        $http.post(coreapi + 'menu/SaveMenu/', $scope.MenuData).success(function (response, status, headers, config) {
            $scope.isError = false;
            $scope.isSuccess = true;
            $scope.successMessage = "Menu details save complete.";
            $("#toTopHover").trigger("click");
        }).error(function (data, status, headers, config) {
            HttpErrorService.getStatus(status, data);

        });
    }
    }]);
})(window, window.angular);