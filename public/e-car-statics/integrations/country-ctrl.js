/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("countryCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List REST Countries Controller initialized.");

    var API = "https://restcountries-v1.p.rapidapi.com/all";
    refresh();

    function refresh() {

        var config = {
            headers: {
                "X-RapidAPI-Host": "restcountries-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "729b8d6310msh481d13170bbb74ap138a89jsn5d34b85865ee"
            }
        };


        console.log("Requesting Country to <" + API + ">...");
        $http
            .get(API, config)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.countries = response.data;
            });
    }

}]);
