(function (window, angular, undefined) {
    'use strict';

    var app = angular.module('apps');

    app.service('WmsUserswSrv', ['$q', '$http',
        function ($q, $http) {

            var WmsUserswSrv = this;


            WmsUserswSrv.GetUserWarehouseList = function (userId, serverId) {
                var defer = $q.defer();
                $http.get(coreapi + 'wms/get-wms-user-warehouse-list?userId=' + userId + '&serverId=' + serverId)
                    .then(function (res) {
                        WmsUserswSrv.userWarehouseList = res.data;
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            WmsUserswSrv.GetActiveServerList = function () {
                var defer = $q.defer();
                $http.get(coreapi + 'wms/get-active-wms-server-list')
                    .then(function (res) {
                        WmsUserswSrv.serverList = res.data;
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            WmsUserswSrv.GetUserList = function (param) {
                var defer = $q.defer();
                $http.get(coreapi + 'wms/get-wms-user-list?param='+param)
                    .then(function (res) {
                        WmsUserswSrv.userList = res.data;
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            WmsUserswSrv.ToggleUserWarehosue = function (wmsUsersw) {
                var defer = $q.defer();
                $http.post(coreapi + 'wms/wms-toggle-user-warehouse', wmsUsersw)
                    .then(function (res) {
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            WmsUserswSrv.UpdateMultipleUserWarehouse = function (warehouseHolder) {
                var defer = $q.defer();
                $http.post(coreapi + 'wms/wms-update-multiple-user-warehouse', warehouseHolder)
                    .then(function (res) {
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            return WmsUserswSrv;

        }]);
})(window, window.angular);