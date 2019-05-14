/*global angular*/

var app = angular.module("EnvironmentApp");

app.controller("ListDioxidCtrl", ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {

    console.log("ListDioxidCtrl ready");

    $scope.url = "/api/v2/issue-dioxid";

    function refresh() {

        $http.get($scope.url).then(function(response) {

            $scope.datos = response.data;
            
            if(!$routeParams.mensaje){
                
                getMensaje(0);
            }
            else{
                
                getMensaje($routeParams.mensaje);
            }
        });

        $scope.loadData = function() {

            $http.get("/api/v2/issue-dioxid/loadInitialData").then(function(response) {

                getMensaje(200);

                refresh();

            }, function(error) {

                getMensaje(error.status);

                refresh();
            });
        };

        $scope.addData = function() {

            var newData = $scope.newData;

            $http.post($scope.url, newData).then(function(response) {

                getMensaje(201);

                refresh();

            }, function(error) {

                getMensaje(error.status);

                refresh();
            });
        };

        $scope.searchData = function(country, year) {

            if (country && !year) {

                $http.get($scope.url + "?country=" + country).then(function(response) {

                    $scope.datos = response.data;

                    getMensaje(200);

                }, function(error) {

                    getMensaje(error.status);

                    refresh();
                });
            } else {

                if (year && !country) {

                    $http.get($scope.url + "?year=" + year).then(function(response) {

                        $scope.datos = response.data;

                        getMensaje(200);

                    }, function(error) {

                        getMensaje(error.status);

                        refresh();

                    });
                } else {

                    refresh();
                }
            }
        };
        
        $scope.pagData = function(limit, offset) {
            
            if(!limit && !offset){
                
                refresh();
                
            }
            else{
                
                var limit2 = parseInt(limit);
                var offset2 = parseInt(offset);
                
                $location.path("/ui/v1/issue-dioxid/pag/" + limit2 + "/" + offset2);
                
            }
        };

        $scope.deleteData = function(country, year) {

            $http.delete($scope.url + "/" + country + "/" + year).then(function(response) {

                getMensaje(200);

                refresh();

            }, function(error) {

                getMensaje(error.status);

                refresh();
            });
        };

        $scope.deleteAllData = function() {

            $http.delete($scope.url).then(function(response) {

                getMensaje(200);

                refresh();

            }, function(error) {

                getMensaje(error.status);

                refresh();
            });
        };
        
        function getMensaje (codigo){
            
            var code = parseInt(codigo);
            
            switch (code) {
                case 0:
                    
                    $scope.mensaje = "Esperando una acción";
                    
                    break;
                    
                case 200:
                    
                    $scope.mensaje = "Acción realizada con exito";
                    
                    break;
                    
                case 201:
                    
                    $scope.mensaje = "Recurso creado con exito";
                    
                    break;
                    
                case 400:
                    
                    $scope.mensaje = "Error: " + code + " = Datos especificados no validos";
                    
                    break;
                    
                case 404:
                    
                    $scope.mensaje = "Error: " + code + " = Recurso no encontrado";
                    
                    break;
                    
                case 409:
                    
                    $scope.mensaje = "Error: " + code + " = conflicto con la base de datos";
                    
                    break;
                    
                case 405:
                    
                    $scope.mensaje = "Error: " + code + " = metodo no permitido";
                    
                    break;
                    
                default:
                    
                    $scope.mensaje = "Error: " + code + " = codigo no identificado";
            }
            
        }
    }

    refresh();
}]);
