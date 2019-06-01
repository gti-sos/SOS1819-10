/* global angular */

angular
    .module("EnvironmentApp")
    .controller("grupalAnalyticsCtrl", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API1 = "/api/v2/biofuels-production";
            var API2 = "/api/v1/e-car-statics";
            var API3 = "/api/v2/issue-dioxid";
            var biofuels = [];
            var ecarstatics = [];
            var issues = [];

            $http.get(API1).then(function(biofuel) {
                $http.get(API2).then(function(car) {
                    $http.get(API3).then(function(issue) {
                        console.log("Data Received: " + JSON.stringify(biofuel.data, null, 2));
                        console.log("Data Received: " + JSON.stringify(car.data, null, 2));
                        console.log("Data Received: " + JSON.stringify(issue.data, null, 2));

                        biofuels = biofuel.data;
                        ecarstatics = car.data;
                        issues = issue.data;


                        var all = biofuels.concat(ecarstatics).concat(issues);

                        var years = all.map(function(item) {

                            var newItem = item.year;
                            return newItem;

                        });


                        let sinRepetidos = years.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual).sort();

                        var mountNorway = sinRepetidos.map(function(year) {
                            var existsVehicles = ""
                            ecarstatics.forEach(function(n) {
                                if (n.country == "Norway" && n.year == year) {
                                    existsVehicles = n.existsVehicles;
                                }
                            });

                            return existsVehicles;

                        });

                        console.log(sinRepetidos);
                        console.log(mountNorway);

                        var naturalChina = sinRepetidos.map(function(year) {
                            var dryNaturalGas = ""
                            biofuels.forEach(function(n) {
                                if (n.country == "China" && n.year == year) {
                                    dryNaturalGas = n.dryNaturalGas;
                                }
                            });
                            return dryNaturalGas;

                        });

                        var naturalBrazil = sinRepetidos.map(function(year) {
                            var dryNaturalGas = ""
                            biofuels.forEach(function(n) {
                                if (n.country == "Brazil" && n.year == year) {
                                    dryNaturalGas = n.dryNaturalGas;
                                }
                            });

                            return dryNaturalGas;

                        });
                        var naturalCanada = sinRepetidos.map(function(year) {
                            var dryNaturalGas = ""
                            biofuels.forEach(function(n) {
                                if (n.country == "Canada" && n.year == year) {
                                    dryNaturalGas = n.dryNaturalGas;
                                }
                            });

                            return dryNaturalGas;

                        });

                        var naturalUSA = sinRepetidos.map(function(year) {
                            var dryNaturalGas = ""
                            biofuels.forEach(function(n) {
                                if (n.country == "United States" && n.year == year) {
                                    dryNaturalGas = n.dryNaturalGas;
                                }
                            });

                            return dryNaturalGas;

                        });

                        var naturalAustralia = sinRepetidos.map(function(year) {
                            var dryNaturalGas = ""
                            biofuels.forEach(function(n) {
                                if (n.country == "Australia" && n.year == year) {
                                    dryNaturalGas = n.dryNaturalGas;
                                }
                            });

                            return dryNaturalGas;

                        });

                        Highcharts.chart('grupal_container', {
                            chart: {
                                zoomType: 'xy'
                            },
                            title: {
                                text: 'Integración Grupal',
                                align: 'left'
                            },
                            xAxis: [{
                                categories: sinRepetidos,
                                crosshair: true
                            }],
                            yAxis: [{ // Primary yAxis
                                labels: {
                                    format: 'billions cubic feet',
                                    style: {
                                        color: Highcharts.getOptions().colors[2]
                                    }
                                },
                                title: {
                                    text: 'Temperature',
                                    style: {
                                        color: Highcharts.getOptions().colors[2]
                                    }
                                },
                                opposite: true

                            }, { // Secondary yAxis
                                gridLineWidth: 0,
                                title: {
                                    text: 'Rainfall',
                                    style: {
                                        color: Highcharts.getOptions().colors[0]
                                    }
                                },
                                labels: {
                                    format: '{value} mm',
                                    style: {
                                        color: Highcharts.getOptions().colors[0]
                                    }
                                }

                            }, { // Tertiary yAxis
                                gridLineWidth: 0,
                                title: {
                                    text: 'Sea-Level Pressure',
                                    style: {
                                        color: Highcharts.getOptions().colors[1]
                                    }
                                },
                                labels: {
                                    format: '{value} mb',
                                    style: {
                                        color: Highcharts.getOptions().colors[1]
                                    }
                                },
                                opposite: true
                            }],
                            tooltip: {
                                shared: true
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'left',
                                x: 80,
                                verticalAlign: 'top',
                                y: 55,
                                floating: true,
                                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
                            },
                            series: [{
                                name: 'Rainfall',
                                type: 'column',
                                yAxis: 1,
                                data: naturalChina,
                                tooltip: {
                                    valueSuffix: ' mm'
                                }

                            }, {
                                name: 'Sea-Level Pressure',
                                type: 'spline',
                                yAxis: 2,
                                data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
                                marker: {
                                    enabled: false
                                },
                                dashStyle: 'shortdot',
                                tooltip: {
                                    valueSuffix: ' mb'
                                }

                            }, {
                                name: 'Temperature',
                                type: 'spline',
                                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                                tooltip: {
                                    valueSuffix: ' °C'
                                }
                            }],
                            responsive: {
                                rules: [{
                                    condition: {
                                        maxWidth: 500
                                    },
                                    chartOptions: {
                                        legend: {
                                            floating: false,
                                            layout: 'horizontal',
                                            align: 'center',
                                            verticalAlign: 'bottom',
                                            x: 0,
                                            y: 0
                                        }
                                    }
                                }]
                            }
                        });

                    });

                });
            });
        }
    ]);
