(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps');
app.controller('SystemUpdateCtrl', ['SystemUpdateService', 'GlobalHelper', '$rootScope', '$scope', '$AspCookie', '$sce',
    function (SystemUpdateService, GlobalHelper, $rootScope, $scope, $AspCookie, $sce) {
        var self = this;

        self.init = function () {
            self.GetVersionList();
            self.GetSystemList();
            self.selectedVersion = {};
            self.userFullname = $AspCookie.get('_214', 'fullname');

        };

        self.GetVersionList = function () {
            var sysId = null;
            console.log(self.selectedSysId);
            if (self.selectedSysId != undefined) {
                sysId = self.selectedSysId;
            }
            GlobalHelper.StartSpin();
            SystemUpdateService.GetVersionList(sysId)
            .then(function (res) {
                self.versionList = SystemUpdateService.versionList
                self.mainVersionList = JSON.parse(JSON.stringify(self.versionList));
                console.log(self.versionList);
            }, function (err) {
                GlobalHelper.getStatus(err.status, err.data);
            });
            GlobalHelper.StopSpin();
        };


        self.GetSystemList = function () {
            SystemUpdateService.GetSystemList()
             .then(function (res) {
                 self.systemList = SystemUpdateService.systemList;
                 console.log(self.systemList);
             }, function (err) {
                 GlobalHelper.getStatus(err.status, err.data);
             });
            GlobalHelper.StopSpin();
        };

        self.GetSystemVersion = function (verId) {
            self.selectedVersion = _.findWhere(self.versionList, { versionId: verId });
            self.selectedUpdateLogs = $sce.trustAsHtml(self.selectedVersion.verreleasenote);
        }


        self.setAdd = function () {
            if (self.EventName == "Edit") {
                self.selectedVersion = {};
            }
            self.EventName = "Add new";
        };


        self.AddSystemUpdate = function () {
            var count = _.where(self.mainVersionList, { systemId: self.selectedVersion.systemId, systemIdverno: self.selectedVersion.systemIdverno }).length;
            if (count > 0) {
                GlobalHelper.Error("Version number already existed in this system")
            }
            else {
                self.selectedVersion.systemName = _.findWhere(self.systemList, { sysId: self.selectedVersion.systemId }).systemName;
                self.selectedVersion.create_by = self.userFullname;
                SystemUpdateService.AddSystemUpdate(self.selectedVersion).then(function (res) {
                    GlobalHelper.Success(res.data);
                    self.GetVersionList();
                    self.selectedVersion = {};
                    $rootScope.closeModalForm();
                }, function (err) {
                    GlobalHelper.getStatus(err.status, err.data);
                });
            }
        };


        self.setEdit = function (versionid) {
            self.EventName = "Edit";
            self.GetSystemVersion(versionid)
        };

        self.EditSystemUpdate = function () {
            var count = _.where(self.mainVersionList, { systemId: self.selectedVersion.systemId, systemIdverno: self.selectedVersion.systemIdverno }).length;
            if (count > 0) {
                GlobalHelper.Error("Version number already existed in this system")
            }
            else {
                SystemUpdateService.EditSystemUpdate(self.selectedVersion).then(function (res) {
                    GlobalHelper.Success(res.data);
                    self.GetVersionList();
                    self.selectedVersion = {};
                    $rootScope.closeModalForm();
                }, function (err) {
                    GlobalHelper.getStatus(err.status, err.data);
                });
            }
        };


        self.DeleteSystemUpdate = function () {
            SystemUpdateService.DeleteSystemUpdate(self.selectedVersion.versionId)
            .then(function (res) {
                GlobalHelper.Success(res.data);
                self.GetVersionList();
                $rootScope.closeModalForm();
            }, function (err) {
                GlobalHelper.getStatus(err.status, err.data);
            })
            self.selectedVersion = {};
        }



        self.init();
    }]);
})(window, window.angular);