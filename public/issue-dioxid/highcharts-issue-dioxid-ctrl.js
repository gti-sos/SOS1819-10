/*global angular*/

var app = angular.module("EnvironmentApp");

app.controller("HighGraphCrtl", ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {

    console.log("HighGraphCrtl ready");

    var url = "/api/v2/issue-dioxid";

    $http.get(url).then(function(response) {

        var emisiones = response.data;

        var datosEspaña = [];
        
        var datosAlbania = [];

        emisiones.forEach(function(i) {

            switch(i.country){
                
                case "España":
                    
                    datosEspaña.push(parseFloat(i.issue_metric_ton));
                    break;
                    
                case "Albania":
                    
                    datosAlbania.push(parseFloat(i.issue_metric_ton));
                    break;
                
                default:
                    
                    break;
            }

        });
        console.log(datosEspaña);
        console.log(datosAlbania);
        Highcharts.chart('issue_dioxid_graph', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Issues Metrics Tons'
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
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
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
                name: 'España',
                data: datosEspaña
            }, {
                name: 'Albania',
                data: datosAlbania
            }]
        });

    }, function(error) {

        console.log("Error al recoger datos");

    });

}]);
