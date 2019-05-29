/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("moviesCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Movies Controller initialized.");

    var API = "proxyMS/api/v1/movies-stats/";
    refresh();

    function refresh() {

        console.log("Requesting biofuels to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.movies = response.data;
            });
    }

}]);
