  var app = angular.module('apps');
app.service('PISMCalendarService', ['$http', '$q', function ($http, $q) {
    var PISMCalendarService = this;

    PISMCalendarService.GetPISMCalendar = function (month, year) {
        var defer = $q.defer();
        $http.get(coreapi + 'pismv2/GetPISMCalendar?month=' + month + '&year=' + year)
            .then(function (res) {
                defer.resolve(res);
                PISMCalendarService.calendarList = res.data;
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }

    PISMCalendarService.PISMBulkUpdateDate = function (dataList) {
        var defer = $q.defer();
        $http.post(coreapi + 'pismv2/PISMBulkUpdateDate', dataList)
            .then(function (res) {
                defer.resolve(res);
            }, function (err) {
                defer.reject(err);
            })
        return defer.promise;
    }



    return PISMCalendarService;

}])