"use strict";
angular.module("sputnikLp",[]).controller("MainCtrl", ["$scope",
    function (a) {
        function c(a) {
            if (-1 === window.location.href.indexOf(a)) return "";
            var b = window.location.href,
                c = b.split("?"),
                d = c[1].split("&"),
                e = null;
            return angular.forEach(d, function (b) {
                var c = b.split("=");
                a === c[0] && (e = c[1])
            }), e
        }
        a.user = {
            id: null,
            firstName: "",
            lastName: "",
            emailAddress: "",
            currency: "EUR",
            tracking: {
                version: "b",
                source: c("utm_source"),
                medium: c("utm_medium"),
                content: c("utm_content"),
                campaign: c("utm_campaign")
            }
        }, a.register = function (a, c) {
            JSON.stringify(c), window.location = "/#/register"
        }
    }
]);