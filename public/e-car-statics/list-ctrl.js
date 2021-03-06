/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("ListCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("ListCtrl ready");

    $scope.url = "/api/v1/e-car-statics";

    $scope.mensaje = "No se ha realizado ninguna acción";

    function refresh() {

         $http.get($scope.url+"?limit=10&offset=0").then(function(response) {
            console.log("Datos recibidos " + JSON.stringify(response.data, null, 2));
            $scope.offset = 0;
            $scope.ecarstatics = response.data;

        });
    };

    $scope.cargaInicial = function() {
        $http.get($scope.url + "/loadInitialData").then(function(response) {
            $scope.ecarstatics = response.data;
            $scope.mensaje = "Carga inicial exitosa";
            refresh();
        }, function(error) {
            $scope.mensaje = "Error : " + error.status + " => Base de datos llena";
            refresh();
        });
    }
    /* El añadir un nuevo campo funciona */
    $scope.addNewCarStatics = function() {

        var newStatic = $scope.newCarStatic;
        console.log("añadiendo una nueva estadística " + JSON.stringify(newStatic, null, 2));

        $http.post($scope.url, newStatic).then(function(response) {
            console.log("Creado correctamente!");
            $scope.mensaje = " Dato añadido correctamente.";
            refresh();
        }, function(error) {
            if (error.status == 409) {
                $scope.mensaje = "Error: " + error.status + " => El recurso ya existe en la base de datos";
                refresh();

            }
            else {
                $scope.mensaje = "Error: " + error.status + " => Los datos especificados no son validos";
                refresh();
            }

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
            /* debug */
            console.log("Deleting field with country " + country + " and year " + year);

            $scope.mensaje = "Recurso borrado";

            refresh();

        }, function(error) {

            $scope.mensaje = "Error: " + error.status + " => Recurso no encontrado"
        });
    };

    $scope.deleteAllData = function() {

        $http.delete($scope.url).then(function(response) {

            $scope.mensaje = "Datos borrados con éxito";

            refresh();
        }, function(error) {

            $scope.mensaje = "Error: " + error.status + " => Base de datos vacía";
        });
    };

    /* Realizar búsqueda*/
    $scope.buscarDesdeHasta = function() {
        console.log("buscando...");
        $http({
            url: $scope.url,
            method: "GET",
            params: { from: $scope.from, to: $scope.to }
        }).then(function(response) {
            $scope.ecarstatics = response.data;
            console.log("Búsqueda realizada " + JSON.stringify(response.data, null, 2));
            $scope.mensaje = "Búsqueda realizada";
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
            $scope.mensaje = "Búsqueda realizada con éxito";
        }, function(error) {
            refresh();
            $scope.mensaje = "Error: " + error.status + " => No existe este País"
        });
    }
    
    $scope.following = function() {
            if($scope.offset>$scope.ecarstatics.length){
                
            }else{
            $scope.offset = $scope.offset + 10;
            }
            console.log($scope.offset);
            $http.get($scope.url + "?limit=10" + "&offset=" + $scope.offset).then(function(response) {
                $scope.status = "ok";
                $scope.ecarstatics = response.data;
                $scope.error = "";
            }, function(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "error";
            });

        };
        
        $scope.previous = function() {
            if ($scope.offset < 10) {
                $scope.offset = 0;
            }
            else {
                $scope.offset = $scope.offset - 10;
            }
            console.log($scope.offset);
            $http.get($scope.url + "?limit=10" + "&offset=" + $scope.offset).then(function(response) {
                $scope.status = "ok";
                $scope.ecarstatics = response.data;
                $scope.error = "";
            }, function(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "error.";
            });


        };
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