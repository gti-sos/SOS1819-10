/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("FoodCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Food Controller initialized.");

    var API = "https://nutritionix-api.p.rapidapi.com/v1_1/search/cheddar%20cheese?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat";
    
    refresh();

    function refresh() {

        var config = {
            headers: {
                "X-RapidAPI-Host": "nutritionix-api.p.rapidapi.com",
                "X-RapidAPI-Key": "12e80667d0msh1fc15a61ae6ba86p1383a0jsn3d7e0e1b3f0f"
            }
        };

        $http
            .get(API, config)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2))
                $scope.foods = response.data.hits;
                
            });
    }

}]);
