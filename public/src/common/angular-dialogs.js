angular.module("dialogs.controllers", ["ui.bootstrap.modal"]).controller("errorDialogCtrl", ["$scope", "$modalInstance", "msg",
    function(o, a, l) {
        o.msg = angular.isDefined(l) ? l : "An unknown error has occurred.", o.close = function() {
            a.close();
        };
    }
]).controller("waitDialogCtrl", ["$scope", "$modalInstance", "$timeout", "msg", "progress",
    function(o, a, l, n, e) {
        o.msg = angular.isDefined(n) ? n : "Waiting on operation to complete.", o.progress = angular.isDefined(e) ? e : 100, o.$on("dialogs.wait.complete", function() {
            l(function() {
                a.close();
            });
        }), o.$on("dialogs.wait.message", function(a, l) {
            o.msg = angular.isDefined(l.msg) ? l.msg : o.msg;
        }), o.$on("dialogs.wait.progress", function(a, l) {
            o.msg = angular.isDefined(l.msg) ? l.msg : o.msg, o.progress = angular.isDefined(l.progress) ? l.progress : o.progress;
        }), o.getProgress = function() {
            return {
                width: o.progress + "%"
            };
        };
    } 
]).controller("notifyDialogCtrl", ["$scope", "$modalInstance", "header", "msg",
    function(o, a, l, n) {
        o.header = angular.isDefined(l) ? l : "Notification", o.msg = angular.isDefined(n) ? n : "Unknown application notification.", o.close = function() {
            a.close();
        };
    }
]).controller("confirmDialogCtrl", ["$scope", "$modalInstance", "header", "msg",
    function(o, a, l, n) {
        o.header = angular.isDefined(l) ? l : "Confirmation", o.msg = angular.isDefined(n) ? n : "Confirmation required.";
         o.no = function() {
            a.dismiss("no");
        };
        o.yes = function() {
            a.close("yes");
        };
    }
]), angular.module("dialogs.services", ["ui.bootstrap.modal", "dialogs.controllers"]).factory("$dialogs", ["$modal",
    function(o) {
        return {
            error: function(a) {
                return o.open({
                    templateUrl: "dialogs/error.tpl.html",
                    controller: "errorDialogCtrl",
                    resolve: {
                        msg: function() {
                            return angular.copy(a);
                        }
                    }
                });
            },
            wait: function(a, l) {
                return o.open({
                    templateUrl: "dialogs/wait.tpl.html",
                    controller: "waitDialogCtrl",
                    resolve: {
                        msg: function() {
                            return angular.copy(a);
                        },
                        progress: function() {
                            return angular.copy(l);
                        }
                    }
                });
            },
            notify: function(a, l) {
                return o.open({
                    templateUrl: "dialogs/notify.tpl.html",
                    controller: "notifyDialogCtrl",
                    resolve: {
                        header: function() {
                            return angular.copy(a);
                        },
                        msg: function() {
                            return angular.copy(l);
                        }
                    }
                });
            },
            confirm: function(a, l) {
                return o.open({
                    templateUrl: "dialogs/confirm.tpl.html",
                    controller: "confirmDialogCtrl",
                    resolve: {
                        header: function() {
                            return angular.copy(a);
                        },
                        msg: function() {
                            return angular.copy(l);
                        }
                    }
                });
            },
            create: function(a, l, n, e) {
                var i = angular.isDefined(e.key) ? e.key : !0,
                    s = angular.isDefined(e.back) ? e.back : !0;
                return o.open({
                    templateUrl: a,
                    controller: l,
                    keyboard: i,
                    backdrop: s,
                    resolve: {
                        data: function() {
                            return angular.copy(n);
                        }
                    }
                });
            }
        };
    }
]), angular.module("dialogs", ["dialogs.services"]).run(["$templateCache",
    function(o) {
    }
]);