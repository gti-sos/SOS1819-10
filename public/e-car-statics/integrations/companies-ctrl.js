/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("companiesCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Companies Controller initialized.");

    var API = "proxyG3/api/v1/companies";
    refresh();

    function refresh() {

        console.log("Requesting pollutions to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.companies = response.data;
            });
    }

}]);
