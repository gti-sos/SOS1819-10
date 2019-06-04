/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("HappinessCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Happiness Controller initialized.");

    var API = "/proxyHappy";
    
    refresh();

    function refresh() {

        $http
            .get(API)
            .then(function(response) {
                
                
                $scope.happiness = response.data;
                
            });
    }

}]);