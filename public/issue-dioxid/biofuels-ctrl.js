/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("BiofuelsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Biofuels Controller initialized.");

    var API = "https://sos1819-10.herokuapp.com/api/v1/biofuels-production";
    
    refresh();

    function refresh() {

        $http
            .get(API)
            .then(function(response) {
                
                $scope.biofuels = response.data;
                
            });
    }

}]);
