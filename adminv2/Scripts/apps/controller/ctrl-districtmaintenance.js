(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps');
app.controller('DistrictCtrl', ['DistrictService',  'GlobalHelper', '$rootScope',
    function (DistrictService,  GlobalHelper, $rootScope) {
        var self = this;


        self.init = function () {
            self.GetDistrict();
            self.districtList = [];
            self.districtModel = {};
        };

        self.GetDistrict = function () {
            GlobalHelper.StartSpin();
            DistrictService.GetDistrictList()
            .then(function (res) {
                self.districtList = DistrictService.districtList
            }, function (err) {
                GlobalHelper.getStatus(err.status, err.data);
            });
            GlobalHelper.StopSpin();
        }

        self.SetAdd = function () {
            if (self.EventName == "Edit") {
                self.districtModel = {};
            }
            self.EventName = "Add new";
        }

        self.AddDistrict = function () {
            DistrictService.AddDistrict(self.districtModel)
            .then(function (res) {
                GlobalHelper.Success(res.data)
                self.districtModel = {};
                self.GetDistrict();
            }, function (err) {
                GlobalHelper.getStatus(err.status, err.data);
            })
        }

        self.setSelectedDistrict = function (districtcde) {
            self.districtModel = _.findWhere(self.districtList, { districtcode: districtcde });
        }

        self.setEdit = function (dcode) {
            self.EventName = "Edit";
            self.setSelectedDistrict(dcode);
        };

        self.EditDistrict = function () {
            DistrictService.EditDistrict(self.districtModel)
            .then(function (res) {
                GlobalHelper.Success(res.data)
                self.districtModel = {};
                self.GetDistrict();
                CloseCustomModal('districtModal');
            }, function (err) {
                GlobalHelper.getStatus(err.status, err.data);
            })
        }

        self.DeleteDistrict = function () {
            DistrictService.DeleteDistrict(self.districtModel)
          .then(function (res) {
              GlobalHelper.Success(res.data)
              self.districtModel = {};
              self.GetDistrict();
              CloseCustomModal('confirmDeleteModal');
          }, function (err) {
              GlobalHelper.getStatus(err.status, err.data);
          })
        }

        self.GetDistrictHead = function () {
            DistrictService.GetDistrictHead(self.districtModel.districtheademail)
                .then(function (res) {
                    var data = res.data
                    self.districtModel.districtheadname = data.employeename2;
                    self.districtModel.districtheadid = data.empl_id;
                    self.districtModel.districtheadcontact = data.homecontact;

                }, function (err) {
                    GlobalHelper.Error(err.data);
                    self.districtModel.districtheadname = '';
                    self.districtModel.districtheadid = '';
                    self.districtModel.districtheadcontact = '';
                })
        }

        self.DeleteDistrict = function () {
            DistrictService.DeleteDistrict(self.districtModel.districtcode)
            .then(function (res) {
                GlobalHelper.Success(res.data);
                self.GetDistrict();
                CloseCustomModal('confirmDeleteModal');
            }, function (err) {
                GlobalHelper.getStatus(err.status, err.data);
            })
        }



        self.init();

    }]);
})(window, window.angular);