  var app = angular.module('apps');
app.service('BranchMSTService', ['$http', '$q', function ($http, $q) {
    var BranchMSTService = this;

    BranchMSTService.GetBranchMstList = function () {
        var defer = $q.defer();
        $http.get(coreapi + 'pismv2/GetBranchMSTList')
            .then(function (res) {
                BranchMSTService.branchMstList = res.data;
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    };

    BranchMSTService.GetDistrictList = function () {
        var defer = $q.defer();
        $http.get(coreapi + 'pismv2/GetDistrictList')
         .then(function (res) {
             BranchMSTService.districtList = res.data;
             defer.resolve(res);
         }, function (err) {
             defer.reject(err);
         })
        return defer.promise;
    };


    BranchMSTService.AddBranchMST = function (data) {
        var defer = $q.defer();
        $http.post(coreapi + 'pismv2/AddBranchMST', data).then(function (res) {
            defer.resolve(res);
        }, function (err) {
            defer.reject(err);
        })
        return defer.promise;
    };

    BranchMSTService.EditBranchMST = function (branch) {
        var defer = $q.defer();
        $http.post(coreapi + 'pismv2/EditBranchMST', branch).then(function (res) {
            defer.resolve(res);
        }, function (err) {
            defer.reject(err);
        })
        return defer.promise;
    };

    BranchMSTService.DeleteBranchMST = function (brancode) {
        var defer = $q.defer();
        $http.delete(coreapi + 'pismv2/DeleteBranchMST', { params: { brancode: brancode } }).then(function (res) {
            defer.resolve(res);
        }, function (err) {
            defer.reject(err);
        })
        return defer.promise;
    }

    return BranchMSTService;
}])