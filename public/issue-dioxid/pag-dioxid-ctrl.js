/*global angular*/

var app = angular.module("EnvironmentApp");

app.controller("PagDioxidCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {

    console.log("PagDioxidCtrl ready");

    $scope.url = "/api/v2/issue-dioxid";

    $scope.mensaje = "Terminando paginacion";

    var limit = parseInt($routeParams.limit);

    var offset = parseInt($routeParams.offset);

    function refresh() {

        $http.get($scope.url + "?limit=" + limit + "&offset=" + offset).then(function(response) {

            $scope.datos = response.data;

            $scope.mensaje = "Paginacion exitosa";

        }, function(error) {

            $scope.mensaje = "Fallo en la paginacion"
        });

        $scope.allIssue = function() {
            
            $location.path("/ui/v1/issue-dioxid/200");

        };

        $scope.nextPag = function() {

            var offset2 = offset + limit;

            $location.path("/ui/v1/issue-dioxid/pag/" + limit + "/" + offset2);


        }
        
        $scope.beforePag = function(){
            
            var offset3 = offset - limit;
            
            if(offset3 < 0){
                
                $scope.mensaje = "No se puede retorceder más en la lista";
                
            }
            else{
                
                $location.path("/ui/v1/issue-dioxid/pag/" + limit + "/" + offset3);
            }
        };
    };

    refresh();

}]);
