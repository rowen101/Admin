(function (window, angular, undefined) {
    'use strict';
var app = angular.module('apps');
app.controller('BranchMSTCtrl', ['BranchMSTService', 'GlobalHelper', '$rootScope', '$AspCookie',
    function (BranchMSTService, GlobalHelper, $rootScope, $AspCookie) {
        var self = this;

        self.init = function () {
            self.branchMstList = [];
            self.districtList = [];
            self.branchModel = {};
            self.editBranch = {};
            self.updatedModel = {};
            self.GetBranchMstList();
        };

        var username = $AspCookie.get('_214', 'fullname');

        self.GetBranchMstList = function () {
            GlobalHelper.StartSpin();
            BranchMSTService.GetBranchMstList()
            .then(function (res) {
                self.branchMstList = BranchMSTService.branchMstList;
            }, function (err) {
                GlobalHelper.getStatus(err.status, err.data);
            });
            GlobalHelper.StopSpin();
        };


        self.GetDistrictList = function () {
            BranchMSTService.GetDistrictList()
             .then(function (res) {
                 self.districtList = BranchMSTService.districtList;
                 self.districtEditList = BranchMSTService.districtList;
             }, function (err) {
                 GlobalHelper.getStatus(err.status, err.data);
             });
            GlobalHelper.StopSpin();
        };

        //self.SelectDistrictHead = function () {
        //    self.selectedHead = _.findWhere(self.districtList, { districtcode: self.branchModel.districtcode });
        //    self.branchModel.branchheadcontact = self.selectedHead.districtheadcontact;
        //    self.branchModel.branchheadname = self.selectedHead.districtheadname;
        //    self.branchModel.branchheademail = self.selectedHead.districtheademail;
        //    self.branchModel.branchheadid = self.selectedHead.districtheadid;
        //};

        self.setAdd = function () {
            if (self.EventName == "Edit") {
                self.branchModel = {};
            }
            self.EventName = "Add new";
        };


        self.AddNewBranchMST = function () {
            var count = _.where(self.branchMstList, { brancode: self.branchModel.brancode }).length;
            self.branchModel.created_by = username;
            if (count > 0)
            {
                GlobalHelper.Error("Brancode already existed!")
            }
            else
            {
            BranchMSTService.AddBranchMST(self.branchModel).then(function (res) {
                GlobalHelper.Success(res.data);
                self.GetBranchMstList();
                self.branchModel = {};
            }, function (err) {
                GlobalHelper.getStatus(err.status, err.data);
            });
            }
        };

        self.setSelected = function (brancode)
        {
            self.branchModel = _.findWhere(self.branchMstList, { brancode: brancode });
        }

        self.getEditBranch = function (branCode) {
            self.EventName = "Edit";
            self.setSelected(branCode)
        };

        self.EditBranchMST = function () {
            BranchMSTService.EditBranchMST(self.branchModel).then(function (res) {
                GlobalHelper.Success(res.data);
                self.GetBranchMstList();
                CloseCustomModal('newKpiModal');
            }, function (err) {
                GlobalHelper.getStatus(err.status, err.data);
            })
            self.branchModel = {}; // clear
        };



        self.DeleteBranchMST = function()
        {
            BranchMSTService.DeleteBranchMST(self.branchModel.brancode)
            .then(function (res) {
                GlobalHelper.Success(res.data);
                self.GetBranchMstList();
                CloseCustomModal('confirmDeleteModal');
            }, function (err) {
                GlobalHelper.getStatus(err.status, err.data);
            })
            self.branchModel = {};
        }
        self.ActivateBranch = function(brancode)
        {
            self.setSelected(brancode);
            self.branchModel.status = "A";
            self.EditBranchMST();
            self.branchModel = {};
        }
        self.DeactivateBranch = function (brancode) {
            self.setSelected(brancode);
            self.branchModel.status = "I";
            self.EditBranchMST();
            self.branchModel = {};
        }


        self.init();
    }]);
    })(window, window.angular);