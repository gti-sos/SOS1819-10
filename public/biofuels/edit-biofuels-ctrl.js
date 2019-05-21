/* global angular */

angular
    .module("EnvironmentApp")
    .controller("EditBiofuelsCtrl", ["$scope",
        "$http",
        "$routeParams",
        "$location",
        function($scope, $http, $routeParams, $location) {
            console.log("Edit Biofuels Controller initialized.");

            var API = "/api/v2/biofuels-production";


            var country = $routeParams.country;
            var year = $routeParams.year;
            var put = true;
            console.log("Requesting biofuel <" + API + "/" + country + "/" + year + ">...");

            $http.get(API + "/" + country + "/" + year).then(function(response) {
                console.log("Data Received: " +
                    JSON.stringify(response.data, null, 2));

                $scope.biofuel = response.data;

            });

            $scope.updatedBiofuel = function(country, year) {
                console.log("Updating a new biofuel: " + JSON.stringify($scope.biofuel));

                Object.keys($scope.biofuel).forEach(p => {
                    if ($scope.biofuel[p] == "") {
                        console.log("El objeto no contiene todos los parametros");
                        $scope.status = "Error: El objeto debe contener todos los parametros.";
                        put = false;
                    }
                })
                if (put) {
                    $http
                        .put(API + "/" + country + "/" + year, $scope.biofuel)
                        .then(function(response) {
                                $scope.status = response.status;
                            },
                            function(error) {
                                $scope.status = error.status;
                            });
                    $location.path("/ui/v1/biofuels-production");
                }
                put = true;
            };



        }
    ]);
