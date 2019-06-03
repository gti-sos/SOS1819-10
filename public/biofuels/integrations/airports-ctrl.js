/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("airportsCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Airports Controller initialized.");

    var API = "https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius?radius=1000&lng=-157.895277&lat=21.265600";
    var airports = [];
    var series = [];
    refresh();

    function refresh() {

        var config = {
            headers: {
                "X-RapidAPI-Host": "cometari-airportsfinder-v1.p.rapidapi.com",
                "X-RapidAPI-Key": "b27a285eb2mshb77acfc1f491de6p1e909djsnb9814b6296df"
            }
        };


        console.log("Requesting Airports to <" + API + ">...");
        $http
            .get(API, config)
            .then(function(response) {

                console.log("Data received:" + JSON.stringify(response.data, null, 2));

                $scope.airports = response.data;
                airports = response.data;

                airports.forEach(function(item) {
                    var airport = {
                        name: item.name,
                        data: [
                            [item.location.longitude, item.location.latitude]
                        ]
                    }
                    series.push(airport);
                    console.log(airport);
                });

                Highcharts.chart('container_airports', {
                    chart: {
                        type: 'scatter',
                        zoomType: 'xy'
                    },
                    title: {
                        text: 'Location(Longitude,Latitude) by Airport'
                    },
                    subtitle: {
                        text: 'Source: Heinz  2003'
                    },
                    xAxis: {
                        title: {
                            enabled: true,
                            text: 'Longitude'
                        },
                        allowDecimals: true,
                        startOnTick: true,
                        endOnTick: true,
                        showLastLabel: true
                    },
                    yAxis: {
                        title: {
                            text: 'Latitude'
                        }
                    },
                    legend: {
                        enable: true
                    },
                    plotOptions: {
                        scatter: {
                            marker: {
                                radius: 5,
                                states: {
                                    hover: {
                                        enabled: true,
                                        lineColor: 'rgb(100,100,100)'
                                    }
                                }
                            },
                            states: {
                                hover: {
                                    marker: {
                                        enabled: false
                                    }
                                }
                            },
                            tooltip: {
                                headerFormat: '<b>{series.name}</b><br>',
                                pointFormat: '{point.x} longitude, {point.y} latitude'
                            }
                        }
                    },
                    series: series
                });



            });
    }

}]);
