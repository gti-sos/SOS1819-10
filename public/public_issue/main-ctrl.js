/*global angular*/

var app =angular.module("MiniPostmanApp");

app.controller("MainCtrl", ["$scope", "$http", function ($scope, $http){
                
                console.log("MainCtrl ready");
                
                $scope.url = "/api/v1/issue-dioxid";
                
                $scope.nombre = "";
                
                $scope.anyo = "";
                
                $scope.emisiones = "";
                
                var objeto = ({
                    
                        nombre_del_pais: $scope.nombre,
                        año: $scope.anyo,
                        emisiones_de_co2: $scope.emisiones
                    });
                
                $scope.get = function (){
                    
                    $http.get($scope.url).then(function (response){
                        
                        $scope.data = JSON.stringify(response.data, null, 2);
                        
                    });
                };
                
                $scope.post = function (){
                    
                    $http.post($scope.url2, objeto).then(function (response){
                        
                        $scope.data2 = response.data2;
                        
                    });
                };
}]);