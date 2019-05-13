/* global angular */

var app = angular.module("BiofuelsApp");

app.controller("ListBiofuelsCtrl", ["$scope", "$http", function($scope, $http) {
    var limit = 10;
    var offset = 0;
    console.log("List Biofuels Controller initialized.");

    var API = "/api/v2/biofuels-production";
    refresh();

    function refresh() {

        console.log("Requesting biofuels to <" + API + ">...");
        $http
            .get(API + "?limit=" + limit + "&offset=" + offset)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.biofuels = response.data;
            });
    }

    $scope.getSiguiente = function() {

        $http.get(API + "?limit=" + limit + "&offset=" + offset).then(function(response) {
            if ((response.data).length == 10) {
                offset = offset + 10;
            }
            $http.get(API + "?limit=" + limit + "&offset=" + offset).then(function(response) {
                $scope.biofuels = response.data;

            });

        }, function Error(response) {
            $scope.biofuels = [];
        });


    }

    $scope.getAnterior = function() {

        if (offset >= 10) {
            offset = offset - 10;
        }
        $http.get(API + "?limit=" + limit + "&offset=" + offset).then(function(response) {
            $scope.biofuels = response.data;
        }, function Error(response) {
            $scope.biofuels = [];
        });
    }
    $scope.loadBiofuels = function() {

        $http
            .get(API + "/loadInitialData").then(function(response) {
                $scope.status = "Carga realizada con exito";
                refresh();
            }, function(error) {
                $scope.status = "Ya hay recursos cargados en la base de datos";
                refresh();
            });
    };

    $scope.addBiofuel = function() {
        var newBiofuel = $scope.newBiofuel;

        console.log("Adding a new biofuel: " + JSON.stringify(newBiofuel));

        $http
            .post(API, newBiofuel)
            .then(function(response) {
                console.log("POST response: " + response.status + " " + response.data);
                $scope.status = "El recurso " + newBiofuel.country + "-" + newBiofuel.year + " se ha añadido con éxito"
                refresh();
            }, function(error) {
                if (error.status == 409) {
                    $scope.status = "Ya existe el recurso " + newBiofuel.country + "-" + newBiofuel.year;
                    refresh();
                } else {
                    $scope.status = "Alguno de los campos no ha sido rellenado correctamente";
                    refresh();
                }
            });


    };

    $scope.deleteBiofuel = function(country, year) {
        console.log("Delete biofuel with country: " + country + " and year: " + year);

        $http
            .delete(API + "/" + country + "/" + year)
            .then(function(response) {
                console.log("DELETE response: " + response.status + " " + response.data);
                $scope.status = "El recurso " + country + "-" + year + " se ha borrado con éxito";
                $scope.getAnterior();

            }, function(error) {
                $scope.status = "El recurso con nombre " + country + " y año " + year + " no existe";
                refresh();
            });



    };

    $scope.deleteBiofuels = function() {
        $http
            .delete(API)
            .then(function(response) {
                $scope.status = "Los recursos se han borrado correctamente";
                refresh();
            });
    };

    $scope.searchByCountry = function() {
        //console.log("Delete biofuel with country: " + country + " and year: " + year);

        $http
            .get("/api/v2/biofuels-production/" + $scope.searchCountry)
            .then(function(response) {
                console.log("SEARCH response: " + response.status + " " + response.data);
                $scope.biofuels = response.data;
            }, function(error) {
                $scope.status = "No existe el recurso " + $scope.searchCountry;
            });



    };

    $scope.searchByYear = function() {
        //console.log("Delete biofuel with country: " + country + " and year: " + year);

        $http
            .get("/api/v2/biofuels-production?from=" + $scope.fromYear + "&to=" + $scope.toYear)
            .then(function(response) {
                console.log("SEARCH response: " + response.status + " " + response.data)
                $scope.biofuels = response.data;
            });



    };



    /* console.log("MainCtrl initialized");
     
     $scope.url = "/api/v1/biofuels-production";

     $scope.load = function() {

         $http.get("/api/v1/biofuels-production/loadInitialData").then(function(response) {

             $scope.data = JSON.stringify(response.data, null, 2);

         }, function(error) {

             $scope.data = JSON.stringify(error.data, null, 2);

         });
     };
     $scope.send = function() {
         $http.get($scope.url).then(function(response) {
             $scope.status = response.status;
             $scope.data = JSON.stringify(response.data, null, 2);
         }, function(error) {
             $scope.status = error.status;
             $scope.data = "";
         });
     };

     $scope.post = function() {
         $http.post($scope.url, $scope.body).then(function(response) {
             $scope.status = response.status;
             $scope.data = "";
         }, function(error) {
             $scope.status = error.status;
             $scope.data = "";
         });
     };

     $scope.put = function() {
         $http.put($scope.url, $scope.body).then(function(response) {
             $scope.status = response.status;
             $scope.data = "";
         }, function(error) {
             $scope.status = error.status;
             $scope.data = "";
         });
     };

     $scope.delete = function() {
         $http.delete($scope.url).then(function(response) {
             $scope.status = response.status;
             $scope.data = "";
         }, function(error) {
             $scope.status = error.status;
             $scope.data = "";
         });
     };
     
     */
}]);
