/* global angular */

angular
    .module("EnvironmentApp")
    .controller("GeoChartsBiofuels", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API = "/api/v2/biofuels-production";
            var biofuels = [];

            $http.get(API).then(function(response) {
                google.charts.load('current', {
                    'packages': ['geochart'],
                    // Note: you will need to get a mapsApiKey for your project.
                    // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var data = [];

                    biofuels = response.data;
                    data.push(["Country", "Dry Natural Gas"]);
                    data.push([biofuels[0].country, biofuels[0].dryNaturalGas]);
                    data.push([biofuels[2].country, biofuels[2].dryNaturalGas]);
                    data.push([biofuels[3].country, biofuels[3].dryNaturalGas]);
                    console.log(data);
                    var plot = google.visualization.arrayToDataTable(data);

                    var options = {};

                    var chart = new google.visualization.GeoChart(document.getElementById('biofuels_id'));

                    chart.draw(plot, options);
                }
            });
        }
    ]);
