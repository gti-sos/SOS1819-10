/* global angular */

angular
    .module("EnvironmentApp")

    .controller("HighchartsCarStatics", ["$scope", "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API = "/api/v1/e-car-statics";
            var ecarstatics = [];
            $http.get(API).then(function(response) {


                Highcharts.chart('carstatics_container', {
                    title: {
                        text: 'Use of electric car per country'
                    },
                    xAxis: {
                        categories: response.data.map(function(d) { return d["country"] + " " + d["year"] })
                    },
                    yAxis: {
                        title: {
                            text: 'Number of vehicles'
                        }

                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        area: {
                            fillColor: {
                                linearGradient: {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops: [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            marker: {
                                radius: 2
                            },
                            lineWidth: 1,
                            states: {
                                hover: {
                                    lineWidth: 1
                                }
                            },
                            threshold: null
                        }
                    },

                    series: [{
                        name: 'Vehiculos eléctricos en uso',
                        data: response.data.map(function(d) { return d["existsVehicles"] })
                    }]
                });



            });
        }
    ]);
