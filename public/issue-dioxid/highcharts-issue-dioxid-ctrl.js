/*global angular*/

var app = angular.module("EnvironmentApp");

app.controller("HighGraphCrtl", ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {

    console.log("HighGraphCrtl ready");

    var url = "/api/v2/issue-dioxid";

    $http.get(url).then(function(response) {

        var emisiones = response.data;

        var datosGraficos = [];

        emisiones.forEach(function(i) {

            if (datosGraficos == []) {

                datosGraficos.push([parseInt(i.year), parseFloat(i.issue_metric_ton)]);
            }
            else {

                var repetido = false;

                datosGraficos.forEach(function(x) {

                    if (x[0] == parseInt(i.year)) {

                        repetido = true;
                    }
                });

                if (repetido == false) {

                    datosGraficos.push([parseInt(i.year), parseFloat(i.issue_metric_ton)]);
                }
            }

        });

        Highcharts.chart('issue_dioxid_graph', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Issue_Metric_Ton'
            },
            subtitle: {
                text: 'Sources: <a href="https://thebulletin.org/2006/july/global-nuclear-stockpiles-1945-2006">' +
                    'thebulletin.org</a> &amp; <a href="https://www.armscontrol.org/factsheets/Nuclearweaponswhohaswhat">' +
                    'armscontrol.org</a>'
            },
            xAxis: {
                allowDecimals: false,
                labels: {
                    formatter: function() {
                        return this.value; // clean, unformatted number for year
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Issues'
                }
            },
            tooltip: {
                pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 1960,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{

                    name: Albania,

                    data: [4.56, 5.67, 6.78]
                },
                {
                    name: España,

                    data: [3.45, 4.56, 7.78]

                }
            ]
        });

    }, function(error) {

        console.log("Error al recoger datos");

    });

}]);
