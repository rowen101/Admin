  var app = angular.module('apps');
app.service('SystemUpdateService', ['$http', '$q', function ($http, $q) {
    var SystemUpdateService = this;

    SystemUpdateService.GetVersionList = function (sysId) {
        var defer = $q.defer();
        $http.get(coreapi + 'SystemVersion/GetVersionList?sysId=' + sysId)
            .then(function (res) {
                SystemUpdateService.versionList = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    };

    SystemUpdateService.GetSystemList = function () {
        var defer = $q.defer();
        $http.get(coreapi + 'SystemVersion/GetSystemList')
            .then(function (res) {
                SystemUpdateService.systemList = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    };

    SystemUpdateService.AddSystemUpdate = function (data) {
        var defer = $q.defer();
        $http.post(coreapi + 'SystemVersion/AddSystemUpdate', data)
            .then(function (res) {
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    };

    SystemUpdateService.EditSystemUpdate = function (data) {
        var defer = $q.defer();
        $http.post(coreapi + 'SystemVersion/EditSystemUpdate', data)
            .then(function (res) {
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    };


    SystemUpdateService.DeleteSystemUpdate = function (verId) {
        var defer = $q.defer();
        $http.delete(coreapi + 'SystemVersion/DeleteSystemUpdate', { params: { versionId: verId } })
            .then(function (res) {
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    };
    



    return SystemUpdateService;
}])