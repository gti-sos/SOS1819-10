/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("expensesCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Expenses Controller initialized.");

    var API = "https://sos1819-02.herokuapp.com/api/v1/scorers-stats";
    refresh();

    function refresh() {

        console.log("Requesting expenses to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.expenses = response.data;
            });
    }

}]);
