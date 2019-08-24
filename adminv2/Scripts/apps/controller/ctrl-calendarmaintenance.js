(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps');
app.controller('PISMCalendarCtrl', ['PISMCalendarService', 'GlobalHelper',
    function (PISMCalendarService, GlobalHelper) {
        var self = this;


        self.init = function () {
            self.monthList = [];
            self.yearList = [];
            self.setDate();
            self.GetPISMCalendar();
            self.isUpdatedCount = 0;
        }


        //Toggle sidebar
        self.sideBarToggle = function () {
            self.sidebarStatus = !self.sidebarStatus;
        }


        self.setDate = function () {

            self.dateToday = new Date();
            self.yearSelected = self.dateToday.getFullYear();
            self.monthSelected = self.dateToday.getMonth() + 1;
            self.PopulateMonth();
            self.PopulateYear();
        }

        self.PopulateMonth = function () {
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ];

            for (var i = 1; i <= 12; i++) {
                self.monthList.push({ 'value': i, 'text': monthNames[i - 1] });
            }
        }

        self.PopulateYear = function () {
            for (var i = 2016; i <= new Date().getFullYear() ; i++) {
                self.yearList.push({ 'value': i, 'text': i });
            }
        }


        self.GetPISMCalendar = function () {
            GlobalHelper.StartSpin();
            PISMCalendarService.GetPISMCalendar(self.monthSelected, self.yearSelected)
            .then(function (res) {
                self.calendarList = PISMCalendarService.calendarList;
                self.mainCalendarList = JSON.parse(JSON.stringify(self.calendarList));
                self.monthName = _.findWhere(self.monthList, { value: self.monthSelected }).text;
            }, function (err) {
                GlobalHelper.getStatus(err.status, err.data);
            })
            GlobalHelper.StopSpin();
        }

        self.toggleNoWork = function (analDate) {
            var data = _.findWhere(self.calendarList, { analysisdate: analDate });
            if (data.isnowork == 1) {
                data.isnowork = 0;
            }
            else if (data.isnowork == 0) {
                data.isnowork = 1;
            }
            self.CheckUpdates(data.analysisdate);
        }

        self.CheckUpdates = function (analDate) {
            var getItem = _.findWhere(self.calendarList, { analysisdate: analDate });
            var getMain = _.findWhere(self.mainCalendarList, { analysisdate: analDate });
            if (getMain.isnowork == getItem.isnowork && getMain.remarks == getItem.remarks) {
                getItem.isUpdated = false;
            }
            else {
                getItem.isUpdated = true;
            }
            self.isUpdatedCount = _.where(self.calendarList, { isUpdated: true }).length;
        }

        self.SaveCalendar = function () {
            var isUpdatedList = _.where(self.calendarList, { isUpdated: true })
            if (isUpdatedList.length > 0) {
                PISMCalendarService.PISMBulkUpdateDate(isUpdatedList)
                .then(function (res) {
                    for (var i = 0; i < isUpdatedList.length; i++) {
                        var item = _.findWhere(self.calendarList, { analysisdate: isUpdatedList[i].analysisdate });
                        item.isUpdated = false;
                    }
                    self.mainCalendarList = JSON.parse(JSON.stringify(self.calendarList));
                    self.isUpdatedCount = 0;
                    GlobalHelper.Success(res.data);
                }, function (err) {
                    GlobalHelper.getStatus(err.status, err.data);
                })
            }
        }

        self.init();

    }]);
    })(window, window.angular);