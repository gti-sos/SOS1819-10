/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("carsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Cars Controller initialized.");

    var API = "/api/v2/issue-dioxid";
    refresh();

    function refresh() {

        console.log("Requesting issue to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.datos = response.data;
            });
    }

}]);
