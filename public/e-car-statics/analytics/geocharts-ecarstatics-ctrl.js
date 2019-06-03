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
                    var paises = response.data.map(function(d) { return d["country"] });
                    var amountOfCars = response.data.map(function(d) { return d["existsVehicles"] });
                    
                    var a = [];
                    a.push(['Country', 'existsVehicles']);
                    for (var i = 0; i < paises.length; i++) {
                        a.push([paises[i], amountOfCars[i]]);
                    }
                    
                    var data = google.visualization.arrayToDataTable(a);
                    
                    var options = {};
            
                    var chart = new google.visualization.GeoChart(document.getElementById('carstatics_id'));
            
                    chart.draw(data, options);
                }
            });
        }
    ]);
