/*global angular*/

var app = angular.module("EnvironmentApp");

app.controller("GraphCrtl", ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {
    
    console.log("GraphCtrl ready");

    $scope.url = "/api/v2/issue-dioxid";
    
    $http.get($scope.url).then(function(response){
        
        datos = response.data;
    });
    
}]);