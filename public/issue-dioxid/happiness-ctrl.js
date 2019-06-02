/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("HappinessCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Happiness Controller initialized.");

    var API = "http://sos1819-04.herokuapp.com/api/v1/happiness-stats";
    
    refresh();

    function refresh() {

        $http
            .get(API)
            .then(function(response) {
                
                
                $scope.happiness = response.data;
                
            });
    }

}]);
