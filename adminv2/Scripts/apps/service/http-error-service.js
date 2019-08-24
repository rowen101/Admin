  var app = angular.module('apps');
app.factory('HttpErrorService', ['$q', '$rootScope', function ($q, $rootScope) {

    var self = this;

    self.getStatus = function (status, data) {
        switch (status) {
            case 401:
                $rootScope.openModalForm('#modal-unauthorized');
                break;
            case 500:
                $rootScope.errorMessage = data;
                $rootScope.openModalForm('#modal-internalerror');
               
                break;
        }
    }

    return self;

}])