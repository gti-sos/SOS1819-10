/* global angular*/

var app = angular.module("EnvironmentApp", ["ngRoute"]).config(function($routeProvider) {

    $routeProvider

        .when("/", {
            templateUrl: "inicio.html"
        })

        //RUTAS CARLOS

        //RUTAS FRAN

        //RUTAS FRAN ALONSO

        .when("/ui/v1/biofuels-production", {

            controller: "ListBiofuelsCtrl",
            templateUrl: "biofuels/list-biofuels.html"

        })

        .when("/ui/v1/biofuels-production/edit/:country/:year", {

            controller: "EditBiofuelsCtrl",
            templateUrl: "biofuels/edit-biofuels.html"

        });
});


console.log("Biofuels App initialized");
