/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("airportsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Airports Controller initialized.");

    var API = "https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=100&lng=-157.895277&lat=21.265600";
    refresh();

    function refresh() {

        var config = {
            headers: {
                "X-RapidAPI-Host": "cometari-airportsfinder-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "b27a285eb2mshb77acfc1f491de6p1e909djsnb9814b6296df"
            }
        };


        console.log("Requesting Airports to <" + API + ">...");
        $http
            .get(API, config)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.airports = response.data;
            });
    }

}]);
