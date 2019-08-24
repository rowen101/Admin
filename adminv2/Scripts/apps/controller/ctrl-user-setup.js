(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps')
    .controller('admin.user.setup', ['$stateParams', '$state', '$http', '$rootScope', '$AspCookie', 'HttpErrorService','Notification',
        function ($stateParams, $state, $http, $rootScope, $AspCookie, HttpErrorService, Notification) {
									    var username = $AspCookie.get('_214', 'fullname');
									    var self = this;

									    self.userId = $stateParams.userId;
									    self.userData = {}

									    self.querySearchEmp = [];
									    self.userData.PmsUserAccess = [];
									    $("#toTopHover").trigger("click");
									    function toggleChevron(e) {
									        $(e.target)
												.prev('.panel-heading')
												.find("i.indicator")
												.toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
									    }

									    $('#accordion').on('hidden.bs.collapse', toggleChevron);
									    $('#accordion').on('shown.bs.collapse', toggleChevron);



									    self.getUserDetails = function () {
									        $http.get(coreapi + 'user/GetUserProfileMaster/' + self.userId).success(function (data, status, headers, config) {
									            self.userData = data;
                                                if (self.userId == 0) {
                                                    self.userData.coreUsers = {};
                                                    self.userData.coreUsers.emailaddress = "";
                                                    self.userData.coreUsers.created_by = username;
                                                } else {
                                                   
                                                    self.unchange = "unchange";
                                                    
                                                }


									        }).error(function (data, status, headers, config) {
									            HttpErrorService.getStatus(status, data);
									        });

									    }

									    self.onSearchEmployeeNotUser = function (p) {
									        $http.get(coreapi + 'user/GetEmployeeListNotUser?search=' + p).success(function (data, status, headers, config) {

									            self.lstEmployee = data;
									            $rootScope.openModalForm('#modal-employee-window');

									        }).error(function (data, status, headers, config) {
									            HttpErrorService.getStatus(status, data);
									        });
									    }

									    //select new employee
									    self.onSelectEmployee = function (p) {
									        self.userData.coreUsers.status = 'A';
									        self.userData.coreUsers.userrole = 'USER';
									        self.userData.coreUsers.lastname = p.lname;
									        self.userData.coreUsers.firstname = p.fname;
									        self.userData.coreUsers.middlename = p.mname;
									        self.userData.coreUsers.emplId = p.empl_id;
									        self.userData.coreUsers.emailaddress = p.emailadd;
									        self.userData.coreUsers.username = p.emailadd;
									        self.userData.coreUsers.mobileno = p.homecontact;
									        self.userData.coreUsers.created_by = username;
									        $rootScope.closeModalForm();
									    }


									    /*
									   * 1 - site list
									   * 2 - application list
									   * 3 - menu list
									   */

									    self.onRightClick = function (p) {
									        self.rightClickMenuSet = p;
									    }

									    self.onRightClick2 = function (p, p2) {
									        self.rightClickMenuSet = p;
									        self.serverSet = p2


									    }

									    self.checkAll = function () {

									        switch (self.rightClickMenuSet) {
									            case 1:
									                for (var i = 0; i < self.userData.userSites.length; i++) {
									                    self.userData.userSites[i].isCheck = true;
									                }
									                break;
									            case 2:
									                for (var i = 0; i < self.userData.userSys.length; i++) {
									                    self.userData.userSys[i].IsCheck = true;
									                }
									                break;
									            case 3:
									                for (var i = 0; i < self.userData.userSys.length; i++) {
									                    if (self.userData.userSys[i].SYSID == self.serverSet) {
									                        for (var ii = 0; ii < self.userData.userSys[i].UserMenu.length; ii++) {
									                            self.userData.userSys[i].UserMenu[ii].canOpen = true;
									                        }
									                        break;
									                    }
									                }
									                break;
									        }
									    }

									    self.unCheckAll = function () {

									        switch (self.rightClickMenuSet) {
									            case 1:
									                for (var i = 0; i < self.userData.userSites.length; i++) {
									                    self.userData.userSites[i].isCheck = false;
									                }
									                break;
									            case 2:
									                for (var i = 0; i < self.userData.userSys.length; i++) {
									                    self.userData.userSys[i].IsCheck = false;
									                }
									                break;
									            case 3:
									                for (var i = 0; i < self.userData.userSys.length; i++) {
									                    if (self.userData.userSys[i].SYSID == self.serverSet) {
									                        for (var ii = 0; ii < self.userData.userSys[i].UserMenu.length; ii++) {
									                            self.userData.userSys[i].UserMenu[ii].canOpen = false;
									                        }
									                        break;
									                    }
									                }
									                break;
									        }
									    }

									    /*
										* 1 select add
										* 2 select edit
										* 3 select delete
										*/
									    self.onSelect = function (p1, p2) {
									        switch (p2) {
									            case 1:
									                for (var i = 0; i < self.userData.userSys.length; i++) {
									                    if (self.userData.userSys[i].SYSID == p1) {
									                        for (var ii = 0; ii < self.userData.userSys[i].UserMenu.length; ii++) {
									                            if (self.userData.userSys[i].UserMenu[ii].isTrans) {
									                                self.userData.userSys[i].UserMenu[ii].canAdd = true;
									                            }
									                        }
									                        break;
									                    }
									                }
									                break;
									            case 2:
									                for (var i = 0; i < self.userData.userSys.length; i++) {
									                    if (self.userData.userSys[i].SYSID == p1) {
									                        for (var ii = 0; ii < self.userData.userSys[i].UserMenu.length; ii++) {
									                            if (self.userData.userSys[i].UserMenu[ii].isTrans) {
									                                self.userData.userSys[i].UserMenu[ii].canEdit = true;
									                            }
									                        }
									                        break;
									                    }
									                }
									                break;
									            case 3:
									                for (var i = 0; i < self.userData.userSys.length; i++) {
									                    if (self.userData.userSys[i].SYSID == p1) {
									                        for (var ii = 0; ii < self.userData.userSys[i].UserMenu.length; ii++) {
									                            if (self.userData.userSys[i].UserMenu[ii].isTrans) {
									                                self.userData.userSys[i].UserMenu[ii].canDelete = true;
									                            }
									                        }
									                        break;
									                    }
									                }
									                break;
									        }

									    }

									    /*
									   * 1 select add
									   * 2 select edit
									   * 3 select delete
									   */
									    self.onUnSelect = function (p1, p2) {
									        switch (p2) {
									            case 1:
									                for (var i = 0; i < self.userData.userSys.length; i++) {
									                    if (self.userData.userSys[i].SYSID == p1) {
									                        for (var ii = 0; ii < self.userData.userSys[i].UserMenu.length; ii++) {
									                            self.userData.userSys[i].UserMenu[ii].canAdd = false;
									                        }
									                        break;
									                    }
									                }
									                break;
									            case 2:
									                for (var i = 0; i < self.userData.userSys.length; i++) {
									                    if (self.userData.userSys[i].SYSID == p1) {
									                        for (var ii = 0; ii < self.userData.userSys[i].UserMenu.length; ii++) {
									                            self.userData.userSys[i].UserMenu[ii].canEdit = false;
									                        }
									                        break;
									                    }
									                }
									                break;
									            case 3:
									                for (var i = 0; i < self.userData.userSys.length; i++) {
									                    if (self.userData.userSys[i].SYSID == p1) {
									                        for (var ii = 0; ii < self.userData.userSys[i].UserMenu.length; ii++) {
									                            self.userData.userSys[i].UserMenu[ii].canDelete = false;
									                        }
									                        break;
									                    }
									                }
									                break;
									        }

									    }



									    self.init = function () {
									        var spinner = new Spinner(opts).spin(spinnerTarget);
									        self.getUserDetails();
									        spinner.stop();
									    }

									    /*
									@ go back to user list page
									*/
									    self.Userlist = function () {

									        $state.go('user');
                                        }

                                        self.onSaveUserpassword = function () {
                                            var spinner = new Spinner(opts).spin(spinnerTarget);
                                            self.userData.created_by = username;

                                            self.userData.coreUsers.userpass = self.userpass;

                                            $http.post(coreapi + 'user/UpdateUserPass/', self.userData.coreUsers).success(function (response, status, headers, config) {
                                                if (status == 200) {
                                                    self.userData.coreUsers.userpass = response;
                                                    $rootScope.closeModalForm();
                                                    $("#toTopHover").trigger("click");
                                                }
                                            }).error(function (data, status, headers, config) {
                                                HttpErrorService.getStatus(status, data);

                                            });
                                            spinner.stop();
                                        }

                                        self.saveChange = function () {
                                          

									        var spinner = new Spinner(opts).spin(spinnerTarget);
                                            self.userData.created_by = username;

									        if (self.userData.PmsUserAccess == null) {
									            self.userData.PmsUserAccess = [];//set array blank if the pmsUserAccess is null
									        }

									        $http.post(coreapi + 'user/SaveUserChanges/', self.userData).success(function (response, status, headers, config) {
                                                if (status == 200) {
                                                    Notification.success(response);
                                                    self.successMessage = response;
                                              
									                $("#toTopHover").trigger("click");
									            }
									        }).error(function (data, status, headers, config) {
									            HttpErrorService.getStatus(status, data);

									        });
									        spinner.stop();
									    }



									}]);
})(window, window.angular);