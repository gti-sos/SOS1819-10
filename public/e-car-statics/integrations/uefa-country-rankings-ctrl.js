/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("uefaCountry", ["$scope", "$http", function($scope, $http) {


    console.log("List Uefa Controller initialized.");

    var API = "https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings";
    refresh();

    function refresh() {

        console.log("Requesting expenses to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.uefacountries = response.data;
            });
    }

}]);
