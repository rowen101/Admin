(function (window, angular, undefined) {
    'use strict';
    var app = angular.module('apps');

    app.controller('WmsUserswCtrl', ['WmsUserswSrv', '$rootScope', 'GlobalHelper', '$AspCookie',
        function (WmsUserswSrv, $rootScope, GlobalHelper, $AspCookie) {
            $rootScope.header = "Vehicle Owner Maintenance";

            var self = this;
            self.wmsUsersw = {};
            self.isOpen = false;
            self.userParam = '';

            var username = $AspCookie.get('_214', 'fullname');

            self.init = function () {
                self.maintenanceName = 'User Server Warehouse'
            }

            self.Refresh = function () {
                self.isOpen = !self.isOpen;
                if (self.isOpen === true) {
                    self.GetActiveServerList();
                }
            }

            self.GetUserList = function () {
                if (self.userParam.length >= 3) {
                    WmsUserswSrv.GetUserList(self.userParam)
                        .then(function (res) {
                            self.userList = WmsUserswSrv.userList;
                            //reset list and userId
                            self.wmsUsersw.userId = null;
                            self.userWarehouseList = [];
                            self.mainList = [];
                        }, function (err) {
                            GlobalHelper.getStatus(err.status, err.data);
                        })
                }
                else {
                    GlobalHelper.Error("Needs atlest 3 characters to search employee list")
                }
            }

            self.GetActiveServerList = function () {
                WmsUserswSrv.GetActiveServerList()
                    .then(function (res) {
                        self.serverList = WmsUserswSrv.serverList;
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    });
            }

            self.GetUserWarehouseList = function () {
                if (self.wmsUsersw.userId && self.wmsUsersw.serverId) {
                    WmsUserswSrv.GetUserWarehouseList(self.wmsUsersw.userId, self.wmsUsersw.serverId)
                        .then(function (res) {
                            self.userWarehouseList = WmsUserswSrv.userWarehouseList;
                            self.mainList = JSON.parse(JSON.stringify(self.userWarehouseList));
                            console.log(self.mainList);
                        }, function (err) {
                            GlobalHelper.getStatus(err.status, err.data);
                        });
                }
                else {
                    self.userWarehouseList = [];
                    self.mainList = [];
                }
            }

            self.ToggleActiveWarhouse = function (serverwarehouseId) {
                self.wmsUsersw.status = "A";
                self.wmsUsersw.created_by = username;
                self.wmsUsersw.serverwarehouseId = serverwarehouseId;
                self.ToggleUserWarehouse();
            }

            self.ToggleInactiveWarhouse = function (serverwarehouseId) {
                self.wmsUsersw.status = "I";
                self.wmsUsersw.created_by = username;
                self.wmsUsersw.serverwarehouseId = serverwarehouseId;
                self.ToggleUserWarehouse();
            }

            self.ToggleUserWarehouse = function () {
                WmsUserswSrv.ToggleUserWarehosue(self.wmsUsersw)
                    .then(function (res) {
                        GlobalHelper.Success(res.data);
                        self.GetUserWarehouseList();
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
            }

            self.UpdateMultipleUserWarehouse = function (holder) {
                WmsUserswSrv.UpdateMultipleUserWarehouse(holder)
                    .then(function (res) {
                        GlobalHelper.Success(res.data);
                        self.GetUserWarehouseList();
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
            }


            self.AddAllWarehouses = function () {
                console.log("FDAS");
                if (self.wmsUsersw.userId && self.wmsUsersw.serverId) {
                    var remWarehouse = _.where(self.mainList, { status: "I" });
                    var userWarehouseHolder = [];

                    for (var i = 0; i < remWarehouse.length; i++) {

                        var userWarehouse = {}
                        userWarehouse.created_by = username;
                        userWarehouse.serverwarehouseId = remWarehouse[i].serverwarehouseId;
                        userWarehouse.userId = self.wmsUsersw.userId;
                        userWarehouse.status = "A";
                        userWarehouseHolder.push(userWarehouse);
                    }
                    self.UpdateMultipleUserWarehouse(userWarehouseHolder);
                }
                else {
                    GlobalHelper.Error("Please select user and server to add all warehouses");
                }
            }

            self.RemoveAllWarehouses = function () {
                console.log("FDAS");
                if (self.wmsUsersw.userId && self.wmsUsersw.serverId) {
                    var remWarehouse = _.where(self.mainList, { status: "A" });
                    var userWarehouseHolder = [];

                    for (var i = 0; i < remWarehouse.length; i++) {

                        var userWarehouse = {}
                        userWarehouse.created_by = username;
                        userWarehouse.serverwarehouseId = remWarehouse[i].serverwarehouseId;
                        userWarehouse.userId = self.wmsUsersw.userId;
                        userWarehouse.status = "I";
                        userWarehouseHolder.push(userWarehouse);
                    }
                    self.UpdateMultipleUserWarehouse(userWarehouseHolder);
                }

                else {
                    GlobalHelper.Error("Please select user and server to remove all warehouses");
                }
            }


            self.init();
        }]);

})(window, window.angular);