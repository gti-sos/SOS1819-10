/*global angular*/

var app = angular.module("EnvironmentApp");

app.controller("EditDioxidCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

    console.log("EditDioxidCtrl ready");

    $scope.url = "/api/v2/issue-dioxid";

    var country = $routeParams.country;

    var year = $routeParams.year;

    $http.get($scope.url + "/" + country + "/" + year).then(function(response) {

        $scope.dato = response.data;
    });

    $scope.updateData = function(country, year) {

        var url = $scope.url + "/" + country + "/" + year;
        
        var resultado = 200;

        $http.put(url, $scope.dato).then(function(response) {

            console.log("Recurso actualizado");

        }, function(error) {

            console.log("Recurso no actualizado");
            
            resultado = parseInt(error.status);
        });

        $location.path("/ui/v1/issue-dioxid/" + resultado);
    };
}]);
