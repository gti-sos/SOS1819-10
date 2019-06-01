/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("pollutionCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Pollution Controller initialized.");

    //var API = "https://sos1819-12.herokuapp.com/api/v1/pollution-stats";
    var API = "proxyPS/api/v1/pollution-stats";
    refresh();

    function refresh() {

        console.log("Requesting pollutions to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.pollutions = response.data;
            });
    }

}]);
