/*global angular*/

var app = angular.module("Issue-DioxidApp");

app.controller("ListCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("ListCtrl ready");

    $scope.url = "/api/v2/issue-dioxid";

    $scope.mensaje = '<div class="alert alert-info">"Esperando una acción"</div>';

    function refresh() {

        $http.get($scope.url).then(function(response) {

            $scope.datos = response.data;

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

            $http.get($scope.url + "?limit=" + limit + "?offset=" + offset).then(function(response) {

                    $scope.datos = response.data;

                    getMensaje(200);

                }, function(error) {

                    getMensaje(error.status);

                    refresh();
                });
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
                case 200:
                    
                    $scope.mensaje = '<div class="alert alert-success">Acción realizada con exito</div>';
                    
                    break;
                    
                case 201:
                    
                    $scope.mensaje = '<div class="alert alert-success">"Recurso creado con exito"</div>';
                    
                    break;
                    
                case 400:
                    
                    $scope.mensaje = '<div class="alert alert-danger">"Error: " + code + " = Datos especificados no validos"</div>';
                    
                    break;
                    
                case 404:
                    
                    $scope.mensaje = '<div class="alert alert-danger">"Error: " + code + " = Recurso no encontrado"</div>';
                    
                    break;
                    
                case 409:
                    
                    $scope.mensaje = '<div class="alert alert-danger">"Error: " + code + " = conflicto con la base de datos"</div>';
                    
                    break;
                    
                case 405:
                    
                    $scope.mensaje = '<div class="alert alert-danger">"Error: " + code + " = metodo no permitido"</div>';
                    
                    break;
                    
                default:
                    
                    $scope.mensaje = '<div class="alert alert-danger">"Error: " + code + " = codigo no identificado"</div>';
            }
            
        }
    }

    refresh();
}]);
