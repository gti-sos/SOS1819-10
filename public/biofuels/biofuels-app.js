/* global angular*/

var app = angular.module("BiofuelsApp", ["ngRoute"]).config(function($routeProvider) {

    $routeProvider.when("/", {

        controller: "ListBiofuelsCtrl",
        templateUrl: "list-biofuels.html"

    }).when("/edit/:country/:year", {

        controller: "EditBiofuelsCtrl",
        templateUrl: "edit-biofuels.html"

    });
});


console.log("Biofuels App initialized");
