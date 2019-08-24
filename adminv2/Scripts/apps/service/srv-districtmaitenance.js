  var app = angular.module('apps');
app.service('DistrictService', ['$http', '$q', function ($http, $q) {
    var DistrictService = this;


    DistrictService.GetDistrictList = function () {
        var defer = $q.defer();
        $http.get(coreapi + 'pismv2/GetDistrictList')
         .then(function (res) {
             DistrictService.districtList = res.data;
             defer.resolve(res);
         }, function (err) {
             defer.reject(err);
         })
        return defer.promise;
    };


    DistrictService.AddDistrict = function (dist)
    {
        var defer = $q.defer();
        $http.post(coreapi + 'pismv2/AddDistrict', dist).then(function (res) {
            defer.resolve(res);
        }, function (err) {
            defer.reject(err);
        })
        return defer.promise;
    };

    DistrictService.EditDistrict = function (dist) {
        var defer = $q.defer();
        $http.post(coreapi + 'pismv2/EditDistrict', dist).then(function (res) {
            defer.resolve(res);
        }, function (err) {
            defer.reject(err);
        })
        return defer.promise;
    };

    DistrictService.DeleteDistrict = function (distCode) {
        var defer = $q.defer();
        $http.delete(coreapi + 'pismv2/DeleteDistrict', { params: { distCode: distCode } }).then(function (res) {
            defer.resolve(res);
        }, function (err) {
            defer.reject(err);
        })
        return defer.promise;
    }

    DistrictService.GetDistrictHead = function(email)
    {
        var defer = $q.defer();
        $http.get(coreapi + 'pismv2/GetDistrictHead', { params: { email: email } })
         .then(function (res) {
             defer.resolve(res);
         }, function (err) {
             defer.reject(err);
         })
        return defer.promise;
    };



}])