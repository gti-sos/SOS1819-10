/*global angular*/

var app = angular.module("Electric-Car-StaticsApp");

app.controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

    console.log("EditCtrl ready");

    $scope.url = "/api/v1/e-car-statics";

    var country = $routeParams.country;

    var year = $routeParams.year;

    $http.get($scope.url + "/" + country + "/" + year).then(function(response) {

        $scope.ecarstatics = response.data;
    });

    $scope.updateData = function(country, year) {

        var url = $scope.url + "/" + country + "/" + year;

        $http.put(url, $scope.ecarstatics).then(function(response) {

            console.log("Bien");

        }, function(error) {

            console.log("Mal");
        });
        
        $location.path("/");
    };
}]);
