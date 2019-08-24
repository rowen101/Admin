(function (window, angular, undefined) {
    'use strict';
    var app = angular.module('apps');

    app.controller('WmsServerCtrl', ['WmsServerSrv', '$rootScope', 'GlobalHelper', '$AspCookie',
        function (WmsServerSrv, $rootScope, GlobalHelper, $AspCookie) {
            $rootScope.header = "Vehicle Owner Maintenance";

            var self = this;
            self.wmsServer = {};
            self.isOpen = false;

            var username = $AspCookie.get('_214', 'fullname');

            self.init = function () {
                self.maintenanceName = 'WmsServer'
            }

            self.Refresh = function () {
                self.isOpen = !self.isOpen;
                if (self.isOpen == true) {
                    self.GetWmsServerList('', 20, 1);
                    self.SetAdd();
                }
            }

            self.GetWmsServerList = function (param, take, pg) {
                WmsServerSrv.GetWmsServerList(param, take, pg)
                    .then(function (res) {
                        self.wmsServerList = WmsServerSrv.wmsServerList.list;
                        self.mainList = JSON.parse(JSON.stringify(self.wmsServerList));
                        console.log(self.mainList);
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
            }


            self.SetAdd = function () {
                self.wmsServer = {};
                self.actionName = 'Add';
            }

            self.AddWmsServer = function () {
                self.wmsServer.created_by = username;

                WmsServerSrv.AddWmsServer(self.wmsServer)
                    .then(function (res) {
                        GlobalHelper.Success(res.data);
                        self.GetWmsServerList('', 20, 1);
                        self.wmsServer = {};
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
            }

            self.SetWmsServer = function (id) {
                self.wmsServer = _.findWhere(self.wmsServerList, { serverId: id });
            }

            self.SetEdit = function (id) {
                self.actionName = 'Edit';
                self.SetWmsServer(id)
            }

            self.EditWmsServer = function () {
                WmsServerSrv.EditWmsServer(self.wmsServer)
                    .then(function (res) {
                        CloseCustomModal('ActionModal');
                        GlobalHelper.Success(res.data);
                        self.GetWmsServerList('', 20, 1);
                        self.wmsServer = {};
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
            }

            self.EditWmsServerStatus = function (id, status) {
                WmsServerSrv.EditWmsServerStatus(id, status)
                    .then(function (res) {
                        self.GetWmsServerList('', 20, 1);
                        GlobalHelper.Success(res.data);
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
            }

            self.DeactivateWmsServer = function (id) {
                self.EditWmsServerStatus(id, "I")
            }

            self.ActivateWmsServer = function (id) {
                self.EditWmsServerStatus(id, "A");
            }

            self.ConfirmDelete = function (serverId) {
                var info = _.findWhere(self.wmsServerList, { serverId: serverId });
                self.servername = info.servername;
                self.serverId = info.serverId;
            }

            self.RemoveWmsServer = function () {
                WmsServerSrv.RemoveWmsServer(self.serverId)
                    .then(function (res) {
                        GlobalHelper.Success(res.data);
                        self.GetWmsServerList('', 20, 1);
                        self.SetAdd();
                    }, function (err) {
                        GlobalHelper.getStatus(err.status, err.data);
                    })
                CloseCustomModal('confirmDeleteServerModal');
            }


            self.init();
        }]);

})(window, window.angular);