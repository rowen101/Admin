(function (window, angular, undefined) {
    'use strict';

    var app = angular.module('apps');

    app.service('WmsWarehouseSrv', ['$q', '$http',
        function ($q, $http) {

            var WmsWarehouseSrv = this;

            WmsWarehouseSrv.GetBranchList = function () {

                var defer = $q.defer();
                $http.get(coreapi + 'wms/get-branch-list')
                    .then(function (res) {
                        WmsWarehouseSrv.branchList = res.data;
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            WmsWarehouseSrv.GetWarehouseList = function (sid) {
                var defer = $q.defer();
                $http.get(coreapi + 'wms/get-wms-warehouse-list?serverId='+sid)
                    .then(function (res) {
                        WmsWarehouseSrv.warehouseList = res.data;
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    }) 
                return defer.promise;
            }

            WmsWarehouseSrv.GetActiveServerList = function () {

                var defer = $q.defer();
                $http.get(coreapi + 'wms/get-active-wms-server-list')
                    .then(function (res) {
                        WmsWarehouseSrv.serverList = res.data;
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }


            WmsWarehouseSrv.AddWarehouse = function (warehouse) {
                var defer = $q.defer();
                $http.post(coreapi + 'wms/add-wms-warehouse', warehouse)
                    .then(function (res) {
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            WmsWarehouseSrv.EditWarehouse = function (warehouse) {
                console.log(warehouse);
                var defer = $q.defer();
                $http.put(coreapi + 'wms/edit-wms-warehouse', warehouse)
                    .then(function (res) {
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            WmsWarehouseSrv.EditWarehouseStatus = function (sid, status) {
                var defer = $q.defer();
                $http.put(coreapi + 'wms/edit-wms-warehouse-status?serverwarehouseId=' + sid + '&status=' + status)
                    .then(function (res) {
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            WmsWarehouseSrv.RemoveWarehouse = function (serverwarehouseId) {
                var defer = $q.defer();
                $http.delete(coreapi + 'wms/remove-wms-warehouse?serverwarehouseId=' + serverwarehouseId)
                    .then(function (res) {
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }


            return WmsWarehouseSrv;

        }]);
})(window, window.angular);