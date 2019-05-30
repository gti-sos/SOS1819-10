/* global angular */

angular
    .module("EnvironmentApp")
    .controller("HighchartsCarStatics", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API = "/api/v1/e-car-statics";
            var ecarstatics = [];
            $http.get(API).then(function(response) {

                ecarstatics = response.data;
                //});



                var years = ecarstatics.map(function(item) {

                    var newItem = item.year;
                    return newItem;

                });

                let sinRepetidos = years.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual).sort();

                var mountNorway = sinRepetidos.map(function(year) {
                    var existsVehicles = ""
                    ecarstatics.filter(function(n) {
                        if (n.country == "Norway" && n.year == year) {
                            existsVehicles = n.existsVehicles;
                        }
                        return (n.country == "Norway" && n.year == year);

                    });

                    return existsVehicles;

                });
                
                var mountHolland = sinRepetidos.map(function(year) {
                    var existsVehicles = ""
                    ecarstatics.filter(function(n) {
                        if (n.country == "Holland" && n.year == year) {
                            existsVehicles = n.existsVehicles;
                        }
                        return (n.country == "Holland" && n.year == year);

                    });

                    return existsVehicles;

                });

                var mountSpain = sinRepetidos.map(function(year) {
                    var existsVehicles = ""
                    ecarstatics.filter(function(n) {
                        if (n.country == "Spain" && n.year == year) {
                            existsVehicles = n.existsVehicles;
                        }
                        return (n.country == "Spain" && n.year == year);

                    });

                    return existsVehicles;

                });
                

                Highcharts.chart('carstatics_container', {

                    title: {
                        text: 'Total electric cars in a country per year'
                    },
                    
                    yAxis: {
                        title: {
                            text: 'Number of Electric Cars'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                            pointStart: 2014
                        }
                    },

                    series: [{
                        name: 'Norway',
                        data: mountNorway
                    }, {
                        name: 'Holland',
                        data: mountHolland
                    }, {
                        name: 'Spain',
                        data: mountSpain
                    }],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }

                });



            });
        }
    ]);
