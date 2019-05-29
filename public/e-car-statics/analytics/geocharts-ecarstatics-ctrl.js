/* global angular */

angular
    .module("EnvironmentApp")
    .controller("GeoChartsCarStatics", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API = "/api/v1/e-car-statics";
            var ecarstatics = [];

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

                    ecarstatics = response.data;
                    data.push(["Country", "existing vehicles"]);
                    data.push([ecarstatics[0].country, ecarstatics[0].existsVehicles]);
                    data.push([ecarstatics[4].country, ecarstatics[4].existsVehicles]);
                    data.push([ecarstatics[5].country, ecarstatics[5].existsVehicles]);
                    data.push([ecarstatics[6].country, ecarstatics[6].existsVehicles]);
                    console.log(data);
                    var plot = google.visualization.arrayToDataTable(data);

                    var options = {};

                    var chart = new google.visualization.GeoChart(document.getElementById('carstatics_id'));

                    chart.draw(plot, options);
                }
            });
        }
    ]);
