/*global angular, Dygraph*/

var app = angular.module("EnvironmentApp");

app.controller("GraphCrtl", ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {

    console.log("GraphCtrl ready");

    var url = "/api/v2/issue-dioxid";

    $http.get(url).then(function(response) {

        var emisiones = response.data;

        var datosGraficos = [];
        
        emisiones.forEach(function(i){
            
            if (i.year in datosGraficos){
                
            }
            else{
                datosGraficos.push([parseInt(i.year), parseFloat(i.issue_metric_ton)]);
            }
        });
        
        $scope.graphiss = new Dygraph(

            document.getElementById("graphiss"),

            datosGraficos,
            
            {
                labels: ["x-coord", "issue_metric_ton"],
                ylabel: "Issues"
                
            }
        );

    }, function(error) {
    
        console.log("Error al recoger datos");

    });

}]);
