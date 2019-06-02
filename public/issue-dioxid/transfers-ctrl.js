/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("TransfersCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Transfers Controller initialized.");

    var API = "https://sos1819-06.herokuapp.com/api/v1/transfer-stats";
    
    refresh();

    function refresh() {

        $http
            .get(API)
            .then(function(response) {
                
                console.log(response);
                $scope.transfers = response.data;
                
            });
    }

}]);
