/*global angular*/

var app = angular.module("Issue-DioxidApp");

app.controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

    console.log("EditCtrl ready");

    $scope.url = "/api/v2/issue-dioxid";

    var country = $routeParams.country;

    var year = $routeParams.year;

    $http.get($scope.url + "/" + country + "/" + year).then(function(response) {

        $scope.dato = response.data;
    });

    $scope.updateData = function(country, year) {

        var url = $scope.url + "/" + country + "/" + year;

        $http.put(url, $scope.dato).then(function(response) {

            console.log("Bien");

        }, function(error) {

            console.log("Mal");
        });
        
        $location.path("/");
    };
}]);
