/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("clubRankingsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Uefa Club Rankings Controller initialized.");

    var API = "https://sos1819-06.herokuapp.com/api/v1/uefa-club-rankings";
    refresh();

    function refresh() {

        console.log("Requesting uefa clubs rankings to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.clubs = response.data;
            });
    }

}]);
