/*global angular*/

var app =angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function ($scope, $http){
                
                console.log("MainCtrl ready");
                
                $scope.url = "/api/v1/issue-dioxid";
                
                $scope.url2 = "/api/v1/issue-dioxid";
                
                $scope.get = function (){
                    
                    $http.get($scope.url).then(function (response){
                        
                        $scope.data = JSON.stringify(response.data, null, 2);
                        
                    });
                };
                
                $scope.post = function (object){
                    
                    $http.post($scope.url2, object).then(function (response){
                        
                        $scope.data2 = JSON.stringify(response.data2, null, 2);
                        
                    });
                };
}]);