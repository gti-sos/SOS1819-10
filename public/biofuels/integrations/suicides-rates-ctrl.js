/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("suicidesCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Suicides Controller initialized.");

    var API = "proxySR/api/v1/suicide-rates";
    refresh();

    function refresh() {

        console.log("Requesting suicides to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.suicides = response.data;
            });
    }

}]);
