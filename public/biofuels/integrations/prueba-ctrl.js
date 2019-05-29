/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("moviesCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Movies Controller initialized.");

    var API = "proxyMS/api/v1/movies-stats/";
    refresh();

    function refresh() {

        var config = {
            headers: {
                "X-RapidAPI-Host":"musixmatchcom-musixmatch.p.rapidapi.com",
                "X-RapidAPI-Key":"b27a285eb2mshb77acfc1f491de6p1e909djsnb9814b6296df"
            }
        };


        console.log("Requesting biofuels to <" + API + ">...");
        $http
            .get(API, config)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.movies = response.data;
            });
    }

}]);
