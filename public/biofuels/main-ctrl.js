/* global angular */

var app = angular.module("BiofuelsApp");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("Main Controller initialized.");

    var API = "/api/v2/biofuels-production";
    var SEARCH = "/api/v2/";
    $scope.search = "biofuels-production?country=Brazil";
    refresh();

    function refresh() {

        console.log("Requesting biofuels to <" + API + ">...");
        $http
            .get(API)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.biofuels = response.data;
            });
    }

    $scope.loadBiofuels = function() {

        $http
            .get(API + "/loadInitialData").then(function(response) {
                refresh();

            }, function(error) {


            });
    };

    $scope.addBiofuel = function() {
        var newBiofuel = $scope.newBiofuel;
        console.log("Adding a new biofuel: " + JSON.stringify(newBiofuel));

        $http
            .post(API, newBiofuel)
            .then(function(response) {
                console.log("POST response: " + response.status + " " + response.data)
                refresh();
            });


    }

    $scope.deleteBiofuel = function(country, year) {
        console.log("Delete biofuel with country: " + country + " and year: " + year);

        $http
            .delete(API + "/" + country + "/" + year)
            .then(function(response) {
                console.log("DELETE response: " + response.status + " " + response.data)
                refresh();
            });



    }

    $scope.deleteBiofuels = function() {
        $http
            .delete(API)
            .then(function(response) {
                $scope.status = response.status;
                refresh();
            });
    };

    $scope.searchBiofuels = function() {
        //console.log("Delete biofuel with country: " + country + " and year: " + year);

        $http
            .get(SEARCH + $scope.search)
            .then(function(response) {
                console.log("SEARCH response: " + response.status + " " + response.data)
                $scope.biofuels = response.data;
            });



    }

    $scope.updatedBiofuel = function() {
        console.log("Updating a new biofuel: " + JSON.stringify($scope.biofuel));
        $http
            .put(API + "/" + $scope.biofuel.country + "/" + $scope.biofuel.year, $scope.biofuel)
            .then(function(response) {
                $scope.status = response.status;
                refresh();
            }, function(error) {
                $scope.status = error.status;
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
