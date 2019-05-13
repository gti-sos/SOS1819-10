/* global angular */

angular
    .module("BiofuelsApp")
    .controller("EditBiofuelsCtrl", ["$scope",
        "$http",
        "$routeParams",
        "$location",
        function($scope, $http, $routeParams, $location) {
            console.log("Edit Biofuels Controller initialized.");

            var API = "/api/v2/biofuels-production";


            var country = $routeParams.country;
            var year = $routeParams.year;

            console.log("Requesting biofuel <" + API + "/" + country + "/" + year + ">...");

            $http.get(API + "/" + country + "/" + year).then(function(response) {
                console.log("Data Received: " +
                    JSON.stringify(response.data, null, 2));

                $scope.biofuel = response.data;
            });

            $scope.updatedBiofuel = function(country, year) {
                console.log("Updating a new biofuel: " + JSON.stringify($scope.biofuel));
                $http
                    .put(API + "/" + country + "/" + year, $scope.biofuel)
                    .then(function(response) {
                        $scope.status = response.status;

                    }, function(error) {
                        $scope.status = error.status;
                    });
                $location.path("/");
            };



        }
    ]);
