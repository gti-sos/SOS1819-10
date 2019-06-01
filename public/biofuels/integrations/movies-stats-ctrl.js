/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("moviesCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Movies Controller initialized.");

    var API = "https://sos1819-02.herokuapp.com/api/v1/movies-stats/";
    refresh();

    function refresh() {

        console.log("Requesting movies to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.movies = response.data;
            });
    }

}]);
