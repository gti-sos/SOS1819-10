/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("BromaCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Bromas Controller initialized.");

    var API = "https://joke3.p.rapidapi.com/v1/joke";
    
    refresh();

    function refresh() {

        var config = {
            headers: {
                "X-RapidAPI-Host": "joke3.p.rapidapi.com",
                "X-RapidAPI-Key": "12e80667d0msh1fc15a61ae6ba86p1383a0jsn3d7e0e1b3f0f"
            }
        };

        $http
            .get(API, config)
            .then(function(response) {

                console.log(response.data.content);
                $scope.broma = response.data.content;
                
            });
    }

}]);
