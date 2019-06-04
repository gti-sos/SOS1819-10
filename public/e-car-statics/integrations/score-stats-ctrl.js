/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("scorerStats", ["$scope", "$http", function($scope, $http) {


    console.log("List ScorerStats Controller initialized.");

    var API1 = "/api/v1/e-car-statics";
    var API2 = "https://sos1819-02.herokuapp.com/api/v1/scorers-stats";
    refresh();

    function refresh() {

        $http.get(API1).then(function(responseCar) {
            $http.get(API2).then(function(responseScorer) {
                
                $scope.scorers = responseScorer.data;
                
                var datosCar = responseCar.data;
                var datosScorer = responseScorer.data;
                
                var a1 = datosCar[0]["marketPart"];
                var b1 = datosCar[1]["marketPart"];
                var c1 = datosCar[2]["marketPart"];
                var d1 = datosCar[3]["marketPart"];
                var e1 = datosCar[4]["marketPart"];
                
                
                var a2 = datosScorer[0]["scoreraverage"];
                var b2 = datosScorer[1]["scoreraverage"];
                var c2 = datosScorer[2]["scoreraverage"];
                var d2 = datosScorer[3]["scoreraverage"];
                var e2 = datosScorer[4]["scoreraverage"];
                
                
                var lab = [];
                
                for (var i in responseCar.data) {
                    lab.push("Country: " + responseCar.data.map(function(d) { return d["country"] })[i]);
                    }

                new Chartist.Line('#Integration2', {
                    
                        labels: lab,
                        
                        series: [
                        [a1, b1, c1, d1, e1],
                        [a2, b2, c2, d2, e2]
                        ]
                     });
            });
        });
    }

}]);
