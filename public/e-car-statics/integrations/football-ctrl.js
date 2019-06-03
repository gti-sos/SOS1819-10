/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("footballCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List number Controller initialized.");

    var API = "https://free-football-soccer-videos.p.rapidapi.com/";
    refresh();

    function refresh() {

        var config = {
            headers: {
                "X-RapidAPI-Host": "free-football-soccer-videos.p.rapidapi.com",
                "X-RapidAPI-Key": "729b8d6310msh481d13170bbb74ap138a89jsn5d34b85865ee",
                "accept": "application/json"
            }
        };


        console.log("Requesting Football to <" + API + ">...");
        $http
            .get(API, config)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.footballs = response.data;
            });
    }

}]);
