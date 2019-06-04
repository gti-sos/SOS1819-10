/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("BiofuelsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Biofuels Controller initialized.");
    
    var API = "/proxyBIO";
    
    refresh();

    function refresh() {

        $http
            .get(API)
            .then(function(response) {
                
                $scope.biofuels = response.data;
                
            });
    }

}]);
