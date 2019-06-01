/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("norrisCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Norris Controller initialized.");

    var API = "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search?query=norris";
    refresh();

    function refresh() {

        var config = {
            headers: {
                "X-RapidAPI-Host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "b27a285eb2mshb77acfc1f491de6p1e909djsnb9814b6296df",
                "accept": "application/json"
            }
        };


        console.log("Requesting Norris Jokes to <" + API + ">...");
        $http
            .get(API, config)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.jokes = response.data.result;
            });
    }

}]);
