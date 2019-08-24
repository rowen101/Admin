  var app = angular.module('apps');
app.service('GlobalHelper', ['Notification', 'blockUI', '$filter', '$q', '$http', '$rootScope',
    function (Notification, blockUI, $filter, $q, $http, $rootScope) {

        var GlobalHelper = this;

        GlobalHelper.msgBody = '';
        GlobalHelper.msgSubj = '';
        GlobalHelper.msgUser = '';

        // Notification success
        GlobalHelper.Success = function (text) {
            Notification.success({
                message: text,
                positionX: 'center'
            });
        }
        //Notification Error
        GlobalHelper.Error = function (text) {
            Notification.error({
                message: text,
                positionX: 'center'
            });
        }
        //Notification Info
        GlobalHelper.Info = function (text) {
            Notification.info({
                message: text,
                positionX: 'center'
            });
        }
        //Start spinner
        GlobalHelper.StartSpin = function () {
            blockUI.start();
            // spinner.spin(spinnerTarget)
        }
        //Stop spinner
        GlobalHelper.StopSpin = function () {
            blockUI.stop();

            // spinner.stop();
        }
        //Add Zero in front of number used for 01,02 .... 09
        GlobalHelper.AddZero = function (date) {
            if (date < 10) {
                return "0" + date;
            }
            else {
                return date;
            }
        }

        //Convert date to yyyy/MM/dd
        GlobalHelper.convertDate = function (givenDate) {
            return $filter('date')(givenDate, "yyyy/MM/dd");
        }

        //Used in ActivateShowReport if Fist letter is T shoot info else shoot success
        GlobalHelper.getFirstLetter = function (param) {
            var res = param.substr(0, 1);
            return res;
        }

        GlobalHelper.daysInMonth = function (iYear, iMonth) {
            var date = new Date(iYear, iMonth, 0).getDate();
            return date;

        }

        GlobalHelper.getMsgOfTheDay = function () {
            var defer = $q.defer();
            var config = {
                headers: {
                    'Token': 'MTMwMzgzMDo4ODkyZDgyNS1jZTQyLTQ0OGEtOTNlOS04ZTI1MWI4YWU3ZDd0c2Fm'
                }
            }
            $http.get('http://apps.fastgroup.biz/core/api/addon/getmsgofday', config)
                 .then(function (res) {
                     GlobalHelper.msgList = res.data.msgOfDay;

                     defer.resolve(res);
                 }, function (err) {
                     defer.reject(err);
                 })
            return defer.promise;
        }

        GlobalHelper.GetUserInSite = function (site) {
            var defer = $q.defer();
            //var config = {
            //    headers: {
            //        'Token': 'MTMwMzgzMDo4ODkyZDgyNS1jZTQyLTQ0OGEtOTNlOS04ZTI1MWI4YWU3ZDd0c2Fm'
            //    }
            //}
            $http.get(pismapi + 'GetUserInSite?brancode=' + site)
                 .then(function (res) {
                     GlobalHelper.siteUsers = res.data.msgOfDay;
                     defer.resolve(res);
                 }, function (err) {
                     defer.reject(err);
                 })
            return defer.promise;
        }

        GlobalHelper.isValidDate = function (date) {
            var d = new Date(date.toString());
            if (Object.prototype.toString.call(d) === "[object Date]" && !isNaN(d.getTime())) {
                return true;
            }
            else {
                return false;
            }
        }

        GlobalHelper.getStatus = function (status, data) {
            switch (status) {
                case 401:
                    $rootScope.openModalForm('#modal-unauthorized');
                    break;
                case 500:
                    $rootScope.errorMessage = data.Message;
                    $rootScope.exceptionMessage = data.ExceptionMessage;
                    $rootScope.openModalForm('#modal-internalerror');
                    break;
            }
        }

        return GlobalHelper;

    }]);
