(function (window, angular, undefined) {
    'use strict';
    var app = angular.module('apps');

    app.controller('WmsWarehouseCtrl', ['WmsWarehouseSrv', '$rootScope', 'GlobalHelper', '$AspCookie',
        function (WmsWarehouseSrv, $rootScope, GlobalHelper, $AspCookie) {
            $rootScope.header = "Vehicle Owner Maintenance";

            var self = this;
            self.warehouse = {};
            self.isOpen = false;

            var username = $AspCookie.get('_214', 'fullname');

            self.init = function () {
                self.maintenanceName = 'Warehouse';
                self.GetBranchList();
            }

            self.Refresh = function () {
                self.isOpen = !self.isOpen;
                if (self.isOpen == true) {
                    self.GetServerList();
                    self.SetAdd();
                }
            }


            self.GetBranchList = function () {
                WmsWarehouseSrv.GetBranchList()
                    .then(function (res) {
                        self.branchList = WmsWarehouseSrv.branchList;
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
            }


            self.GetWarehouseList = function () {
           
                if (self.serverId) {
                    GlobalHelper.StartSpin();
                    WmsWarehouseSrv.GetWarehouseList(self.serverId)
                        .then(function (res) {
                            self.warehouseList = WmsWarehouseSrv.warehouseList;
                            self.mainList = JSON.parse(JSON.stringify(self.warehouseList));
                            console.log(self.mainList);
                            self.warehouse = {};
                        }, function (err) {
                            GlobalHelper.getStatus(err.status, err.data);
                        }).finally(function () {
                            GlobalHelper.StopSpin();
                        });
                }
            }

            self.GetServerList = function () {
                WmsWarehouseSrv.GetActiveServerList()
                    .then(function (res) {
                        self.serverList = WmsWarehouseSrv.serverList;
                        console.log(self.serverList);
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
            }

            self.SetAdd = function () {
                self.warehouse = {};
                self.actionName = 'Add';
            }

            self.AddWarehouse = function () {
                self.warehouse.created_by = username;
                self.warehouse.serverId = self.serverId;
                WmsWarehouseSrv.AddWarehouse(self.warehouse)
                    .then(function (res) {
                        GlobalHelper.Success(res.data);
                        self.GetWarehouseList();
                        self.warehouse = {};
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
            }

            self.SetWarehouse = function (id) {
                self.warehouse = _.findWhere(self.warehouseList, { serverwarehouseId: id });
            }

            self.SetEdit = function (id) {
                self.actionName = 'Edit';
                self.SetWarehouse(id)
            }

            self.EditWarehouse = function () {
                WmsWarehouseSrv.EditWarehouse(self.warehouse)
                    .then(function (res) {
                        GlobalHelper.Success(res.data);
                        self.GetWarehouseList();
                        self.warehouse = {};
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
            }

            self.EditWarehouseStatus = function (id, status) {
                WmsWarehouseSrv.EditWarehouseStatus(id, status)
                    .then(function (res) {
                        self.GetWarehouseList();
                        GlobalHelper.Success(res.data);
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
            }

            self.DeactivateWarehouse = function (id) {
                self.EditWarehouseStatus(id, "I")
            }

            self.ActivateWarehouse = function (id) {
                self.EditWarehouseStatus(id, "A");
            }

            self.ConfirmDelete = function (serverwarehouseId) {
                var info = _.findWhere(self.warehouseList, { serverwarehouseId: serverwarehouseId });
                console.log(info);
                self.warehousecode = info.warehousecode;
                self.serverwarehouseId = info.serverwarehouseId;
            }

            self.RemoveWarehouse = function () {
                WmsWarehouseSrv.RemoveWarehouse(self.serverwarehouseId)
                    .then(function (res) {
                        GlobalHelper.Success(res.data);
                        self.GetWarehouseList();
                        self.SetAdd();
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
                CloseCustomModal('confirmDeleteWarehouseModal');
            }

            self.init();
        }]);

})(window, window.angular);