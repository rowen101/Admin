(function (window, angular, undefined) {
    'use strict';

    var app = angular.module('apps');

    app.service('WmsServerSrv', ['$q', '$http',
        function ($q, $http) {

            var WmsServerSrv = this;

            WmsServerSrv.GetWmsServerList = function (param, tk, pg) {
                var defer = $q.defer();
                $http.get(coreapi + 'wms/get-wms-server-list?param=' + param + '&tk=' + tk + '&pg=' + pg)
                    .then(function (res) {
                        WmsServerSrv.wmsServerList = res.data;
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

          


            WmsServerSrv.AddWmsServer = function (wmsServer) {
                var defer = $q.defer();
                $http.post(coreapi + 'wms/add-wms-server', wmsServer)
                    .then(function (res) {
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            WmsServerSrv.EditWmsServer = function (wmsServer) {
                var defer = $q.defer();
                $http.put(coreapi + 'wms/edit-wms-server', wmsServer)
                    .then(function (res) {
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            WmsServerSrv.EditWmsServerStatus = function (sid, status) {
                var defer = $q.defer();
                $http.put(coreapi + 'wms/edit-wms-server-status?serverId=' + sid + '&status=' + status)
                    .then(function (res) {
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }

            WmsServerSrv.RemoveWmsServer = function (serverId) {
                var defer = $q.defer();
                $http.delete(coreapi + 'wms/remove-wms-server?serverId=' + serverId)
                    .then(function (res) {
                        defer.resolve(res);
                    }, function (err) {
                        defer.reject(err);
                    })
                return defer.promise;
            }


            return WmsServerSrv;

        }]);
})(window, window.angular);