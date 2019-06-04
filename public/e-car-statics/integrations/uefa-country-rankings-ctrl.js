/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("uefaCountry", ["$scope", "$http", function($scope, $http) {


    console.log("List Uefa Controller initialized.");

    var API1 = "/api/v1/e-car-statics";
    var API2 = "https://sos1819-06.herokuapp.com/api/v1/uefa-country-rankings";
    refresh();

    function refresh() {

        $http.get(API1).then(function(responseCar) {
            $http.get(API2).then(function(responseCountry) {
                
                $scope.uefacountries=responseCountry.data;
                var datos = [];

                for (var i in responseCar.data) {
                    var dato = {
                        name: "Country: " + responseCar.data.map(function(d) { return d["country"] + " " + d["year"] })[i],
                        y: responseCar.data.map(function(d) { return d["existsVehicles"] })[i]
                    };
                    datos.push(dato);
                }

                for (var i in responseCountry.data) {
                    var dato1 = {
                        name: "Country: " + responseCountry.data.map(function(d) { return d["country"] + " " + d["season"] })[i],
                        y: responseCountry.data.map(function(d) { return d["points"] })[i]
                    };
                    datos.push(dato1);
                }
                console.log(datos)

                Highcharts.chart('#integration1', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: 0,
                        plotShadow: false
                    },
                    title: {
                        text: '<br>Use of electric car and points in Uefa<br>',
                        align: 'center',
                        verticalAlign: 'middle',
                        y: 40
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.y}</b>'
                    },
                    plotOptions: {
                        pie: {
                            dataLabels: {
                                enabled: true,
                                distance: -50,
                                style: {
                                    fontWeight: 'bold',
                                    color: 'white'
                                }
                            },
                            startAngle: -90,
                            endAngle: 90,
                            center: ['50%', '50%'],
                            size: '110%'
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Data',
                        innerSize: '50%',
                        data: datos
                    }]
                });

            });
        });
    }

}]);
