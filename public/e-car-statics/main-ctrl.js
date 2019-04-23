/* global angular */

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("MainCtrl ready");

    $scope.url = "/api/v1/e-car-statics";

    function refresh() {

        $http.get($scope.url).then(function(response) {
            console.log("Datos recibidos "+JSON.stringify(response.data,null,2));
            $scope.ecarstatics = response.data;

        });
    };
        /* El añadir un nuevo campo funciona */
        $scope.addNewCarStatics = function() {

            var newStatic = $scope.newCarStatic;
            console.log("añadiendo una nueva estadística "+ JSON.stringify(newStatic, null, 2));

            $http.post($scope.url, newStatic).then(function(response) {
                console.log("Creado correctamente!");
                refresh();

            });
        };

        $scope.updateData = function(country, year) {

            var updateData = $scope.updateData;

            $http.put($scope.url + "/" + country + "/" + year, updateData).then(function(response) {

                refresh();

            });
        };
        /* Los delete funcionan */
        $scope.deleteCarStatics = function(country, year) {

            $http.delete($scope.url+"/"+country+"/"+year).then(function(response) {
                console.log("Deleting field with country "+country+ " and year "+year);
                refresh();

            });
        };

        $scope.deleteAllData = function() {

            $http.delete($scope.url).then(function(response) {

                refresh();
            });
        };
        
        /* Realizar búsqueda*/
        $scope.buscarDesdeHasta = function(){
            console.log("buscando...");
            $http({
                url: $scope.url, 
                method: "GET",
                params: {from: $scope.from, to: $scope.to}
            }).then(function (response){
                $scope.ecarstatics= response.data;
                console.log("Búsqueda realizada "+JSON.stringify(response.data,null,2));
            });
                
        };
        
        /* Realizar búsqueda por país */
        $scope.buscarPais = function(country) {
            console.log("Buscando ... ");
            $http({
                url: $scope.url + "/" + country,
                method: "GET",
            }).then(function(response) {
                $scope.ecarstatics = response.data;
                console.log("Búsqueda realizada" + JSON.stringify(response.data, null, 2));
            });
        }
        
    refresh();
}]);

/*
var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope","$http", function ($scope,$http){
                console.log("MainCtrl initialized");
                $scope.url = "/api/v1/e-car-statics";
            
                
                $scope.send = function(){
                    $http.get($scope.url).then(function (response){
                        $scope.status = response.status;
                        $scope.data = JSON.stringify(response.data,null,2);
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                    });
                };
                
                $scope.post = function(){
                    $http.post($scope.url,$scope.body).then(function (response){
                        $scope.status = response.status;
                        $scope.data = "";
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                    });
                };
                
                $scope.put = function(){
                    $http.put($scope.url,$scope.body).then(function (response){
                        $scope.status = response.status;
                        $scope.data = "";
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                    });
                };
                
                $scope.delete = function(){
                    $http.delete($scope.url).then(function(response){
                        $scope.status = response.status;
                        $scope.data = "";
                    }, function (error){
                        $scope.status = error.status;
                        $scope.data = "";
                    });
                };
}]);

*/