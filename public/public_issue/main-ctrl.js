/*global angular*/

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("MainCtrl ready");

    $scope.url = "/api/v1/issue-dioxid";

    $scope.mensaje = "Esperando una acción";

    function refresh() {

        $http.get($scope.url).then(function(response) {

            $scope.datos = response.data;

        });

        $scope.loadData = function() {

            $http.get("/api/v1/issue-dioxid/loadInitialData").then(function(response) {

                $scope.mensaje = "Carga de datos exitosa";

                refresh();

            }, function(error) {

                $scope.mensaje = "Error: " + error.status + " = Base de datos no vacía";

                refresh();
            });
        };

        $scope.addData = function() {

            var newData = $scope.newData;

            $http.post($scope.url, newData).then(function(response) {

                $scope.mensaje = "Recurso creado con exito.";

                refresh();

            }, function(error) {

                if (error.status == 409) {

                    $scope.mensaje = "Error: " + error.status + " = el recurso ya existe en la base de datos";

                    refresh();

                }
                else {

                    $scope.mensaje = "Error: " + error.status + " = los datos especificados no son validos";

                    refresh();
                }
            });
        };

        $scope.updateData = function(country, year) {

            var updateData = $scope.updateData;

            var url = $scope.url + "/" + country + "/" + year;

            $http.put(url, updateData).then(function(response) {

                $scope.mensaje = "Recurso actualizado con exito.";

                refresh();

            }, function(error) {

                if (error.status == 409) {

                    $scope.mensaje = "Error: " + error.status + " = el recurso no existe en la base de datos";

                    refresh();

                }
                else {

                    $scope.mensaje = "Error: " + error.status + " = los datos especificados no son validos";

                    refresh();
                }
            });
        };

        $scope.searchData = function(country, year) {

            if (country && !year) {

                $http.get($scope.url + "?country=" + country).then(function(response) {

                    $scope.datos = response.data;

                    $scope.mensaje = "Recurso/s encontrado/s con exito";

                }, function(error) {

                    $scope.mensaje = "Error: " + error.status + " = recurso/s no encontrado/s";

                    refresh();
                });
            }
            else {

                if (year && !country) {

                    $http.get($scope.url + "?year=" + year).then(function(response) {

                        $scope.datos = response.data;

                        $scope.mensaje = "Recurso/s encontrado/s con exito";

                    }, function(error) {

                        $scope.mensaje = "Error: " + error.status + " = recurso/s no encontrado/s";

                        refresh();

                    });
                }
                else {

                    refresh();
                }
            }
        };

        $scope.deleteData = function(country, year) {

            $http.delete($scope.url + "/" + country + "/" + year).then(function(response) {

                $scope.mensaje = "Recurso borrado";

                refresh();

            }, function(error) {

                $scope.mensaje = "Error: " + error.status + " = recurso no encontrado";

                refresh();
            });
        };

        $scope.deleteAllData = function() {

            $http.delete($scope.url).then(function(response) {

                $scope.mensaje = "Datos borrados con exito";

                refresh();

            }, function(error) {

                $scope.mensaje = "Error: " + error.status + " = base de datos vacía";

                refresh();
            });
        };
    }

    refresh();
}]);
