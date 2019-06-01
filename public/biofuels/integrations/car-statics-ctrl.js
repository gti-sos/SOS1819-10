/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("carsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Cars Controller initialized.");

    var API = "/api/v1/e-car-statics";
    refresh();

    function refresh() {

        console.log("Requesting cars to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.ecarstatics = response.data;
            });
    }

}]);
