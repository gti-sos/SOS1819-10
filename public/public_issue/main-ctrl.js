/*global angular*/

var app = angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function($scope, $http) {

    console.log("MainCtrl ready");

    $scope.url = "/api/v1/issue-dioxid";

    function refresh() {

        $http.get($scope.url).then(function(response) {

            $scope.datos = response.data;

        });

        $scope.loadData = function() {

            $http.get("/api/v1/issue-dioxid/loadInitialData").then(function(response) {

                refresh();

            });
        };

        $scope.addData = function() {

            var newData = $scope.newData;

            $http.post($scope.url, newData).then(function(response) {

                refresh();

            });
        };

        $scope.updateData = function() {

            var updateData = $scope.updateData;

            $http.put($scope.url, updateData).then(function(response) {

                refresh();

            });
        };

        $scope.deleteData = function(country, year) {

            $http.delete($scope.url + "/" + country + "/" + year).then(function(response) {

                refresh();

            });
        };
        
        $scope.deleteAllData = function(){
            
            $http.delete($scope.url).then(function(response){
                
                refresh();
            });
        };
    }

    refresh();
}]);
