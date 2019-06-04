/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("HeartCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Heart Controller initialized.");

    var API = "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards";
    
    refresh();

    function refresh() {

        var config = {
            headers: {
                "X-RapidAPI-Host": "omgvamp-hearthstone-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "12e80667d0msh1fc15a61ae6ba86p1383a0jsn3d7e0e1b3f0f"
            }
        };

        $http
            .get(API, config)
            .then(function(response) {

                
                $scope.cards = response.data.Basic;
                
            });
    }

}]);
