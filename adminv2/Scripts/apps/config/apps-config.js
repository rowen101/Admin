(function (window, angular, undefined) {
    'use strict';
    var app = angular.module('apps.config', ['ng'])
    .config(['$stateProvider', '$urlRouterProvider',
                        function ($stateProvider, $urlRouterProvider) {
                            $urlRouterProvider
	      .otherwise('/dashboard');

                            $stateProvider
                                .state('dashboard', {
                                    url: '/dashboard',
                                    templateUrl: u_home + '/dashboard',
                                    controller: 'ctrlDashboard as ctrl',
                                    ncyBreadcrumb: {
                                        label: 'Dashboard'
                                    }
                                })
                                  .state('releasenotes', {
                                    url: '/releasenotes',
                                    templateUrl: u_home + '/releasenote',
                                    controller: 'ctrlReleasenote as ctrl',
                                    ncyBreadcrumb: {
                                        label: 'Release Notes'
                                    }
                                })
                                .state('160300000036', {
                                    url: '/core/mail',
                                    templateUrl: u_admin + '/CoreMail',
                                    controller: 'Ctrlcoremail as ctrl',
                                    ncyBreadcrumb: {
                                        label: 'Core Mail'
                                    }
                                })
                                 .state('161800000035', {
                                     url: '/svr/lst',
                                     templateUrl: u_admin + '/ServerList',
                                     controller: 'server.list as ctrl',
                                     ncyBreadcrumb: {
                                         label: 'Server List'
                                     }
                                 })

                                 .state('user', {
                                     url: '/a/u',
                                     templateUrl: u_admin + '/user-list',
                                     controller: 'admin.user.list as ctrl',
                                     ncyBreadcrumb: {
                                         label: 'User List'
                                     }
                                 })
                                     .state('newUser', {
                                         url: 'new/user/:userId',
                                         templateUrl: u_admin + '/user-setup/',
                                         controller: 'admin.user.setup as ctrl',
                                         ncyBreadcrumb: {
                                             label: 'New User',
                                             parent: 'user'
                                         }
                                     })
                            .state('editUser', {
                                url: '/a/m/:userId',
                                templateUrl: u_admin + '/user-setup/',
                                controller: 'admin.user.setup as ctrl',
                                ncyBreadcrumb: {
                                    label: 'Edit User',
                                    parent: 'user'
                                }
                            })
                                 .state('172200', {
                                     url: 'piso/userwarehouse/',
                                     templateUrl: u_admin + '/pisobranch',
                                     controller: 'ctrl.pisobranch as ctrl',
                                     ncyBreadcrumb: {
                                         label: 'PISO User List'
                                     }
                                 })
                                 .state('2017060409223887', {
                                     url: '/itsek-branch/',
                                     templateUrl: u_admin + '/itsekbranch',
                                     controller: 'ctrl.itsekbranch as ctrl',
                                     ncyBreadcrumb: {
                                         label: 'Itsek User List'
                                     }
                                 })
                                .state('20170222000000', {
                                    url: 'pism/usersite/',
                                    templateUrl: u_admin + '/pismbranch',
                                    controller: 'ctrl.pismuserbranch as ctrl',
                                    ncyBreadcrumb: {
                                        label: 'PISM User List'
                                    }
                                })
                            .state('161900000031', {
                                url: '/a/wms/u',
                                templateUrl: u_admin + '/wms-user-list',
                                controller: 'wms.user.list as ctrl',
                                ncyBreadcrumb: {
                                    label: 'WMS User'
                                }
                            })
                            .state('system-list', {
                                url: '/a/s-l',
                                templateUrl: u_admin + '/apps-list/',
                                controller: 'admin.apps.list as ctrl',
                                ncyBreadcrumb: {
                                    label: 'Application List'
                                }
                            })
                            .state('MenuList', {
                                url: '/a/m/l/:appsID',
                                templateUrl: u_admin + '/menuList/',
                                controller: 'admin.menu.list',
                                ncyBreadcrumb: {
                                    label: 'Menu List'
                                }
                            })

                              .state('newMenu', {
                                  url: '/Admin/menu-new/',
                                  templateUrl: u_admin + '/menu-setup/',
                                  controller: 'admin.menu.setup',
                                  ncyBreadcrumb: {
                                      label: 'New Menu',
                                      parent: 'MenuList'
                                  }
                              })

                            .state('editMenu', {
                                url: '/a/m-e?menuID&sysId:',
                                templateUrl: u_admin + '/menu-setup/',
                                controller: 'admin.menu.setup',
                                ncyBreadcrumb: {
                                    label: 'Edit Menu',
                                    parent: 'MenuList'
                                }
                            })


                            .state('17230000000058', {
                                url: '/CoreBranchMaintenance',
                                templateUrl: u_admin + '/CoreBranchMaintenance',
                                controller: 'BranchMSTCtrl as ctrl',
                                ncyBreadcrumb: {
                                    label: 'Branch Master Maintenance'
                                }
                            })

                                .state('17230000000060', {
                                    url: '/CoreDistrictMaintenance',
                                    templateUrl: u_admin + '/CoreDistrictMaintenance',
                                    controller: 'DistrictCtrl as ctrl',
                                    ncyBreadcrumb: {
                                        label: 'District Maintenance'
                                    }
                                })

                               .state('17100000000070', {
                                   url: '/PISMCalendar',
                                   templateUrl: u_admin + '/CoreCalendarMaintenance',
                                   controller: 'PISMCalendarCtrl as ctrl',
                                   ncyBreadcrumb: {
                                       label: 'Calendar Maintenance'
                                   }
                               })

                            .state('20170228120000', {
                                     url: '/System Updates',
                                     templateUrl: u_admin + '/SystemUpdateMaintenance',
                                     controller: 'SystemUpdateCtrl as ctrl',
                                     ncyBreadcrumb: {
                                         label: 'System Update Maintenance'
                                     }
                                 })

                            .state('2017050806123185', {
                                url: '/AQUILA',
                                templateUrl: u_admin + '/AquilaMaintenance',
                                //controller: 'AquilaCtrl as ctrl',
                                ncyBreadcrumb: {
                                    label: 'Aquila Maintenance'
                                }
                            })

                        }]);

})(window, window.angular);