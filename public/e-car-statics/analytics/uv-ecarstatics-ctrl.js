/* global angular */

angular
    .module("EnvironmentApp")
    .controller("uvchartCarStatics", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var dato1 = [];
            var dato2 = [];

            var API = "/api/v1/e-car-statics";
            var ecarstatics = [];

            $http.get(API).then(function(response) {
                var i;
                for (i = 0; i < response.data.length; i++) {
                    dato1.push(response.data[i].country);
                    dato2.push(response.data[i].existsVehicles);
                }
                console.log(dato1);
                console.log(dato2);
            });

            $http.get(API).then(function(response) {
                let uvCharts = [];
                response.data.forEach(function(elem) {
                    let name = elem.country;
                    let value = elem.existsVehicles;
                    uvCharts.push({ "name": name, "value": value});
                    // }
                });

                var graphdef = {
                    categories: ['uvCharts'],
                    dataset: {
                        'uvCharts': uvCharts
                    }
                };


                var chart = uv.chart('Bar', graphdef, {
                    meta: {
                        caption: 'Number of electric vehicles per country',
                        hlabel: 'Mount of vehicles',
                        vlabel: 'Country'
                    }
                });
            });
        }
    ]);