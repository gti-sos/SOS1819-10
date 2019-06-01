/* global angular */

angular
    .module("EnvironmentApp")
    .controller("GeoChartsIssueDioxid", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API = "/api/v2/issue-dioxid";
            var issues = [];

            $http.get(API).then(function(response) {
                google.charts.load('current', {
                    'packages': ['geochart'],
                    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var data = [];

                    issues = response.data;
                    
                    data.push(["Country", "issue_metric_ton"]);
                    data.push([issues[0].country, parseInt(issues[0].issue_metric_ton)]);
                    data.push([issues[3].country, parseInt(issues[3].issue_metric_ton)]);
                    data.push([issues[6].country, parseInt(issues[6].issue_metric_ton)]);
                    data.push([issues[7].country, parseInt(issues[7].issue_metric_ton)]);
                    data.push([issues[8].country, parseInt(issues[8].issue_metric_ton)]);
                    
                    console.log(data);
                    var plot = google.visualization.arrayToDataTable(data);

                    var options = {};

                    var chart = new google.visualization.GeoChart(document.getElementById('issue_dioxid_id'));

                    chart.draw(plot, options);
                }
            });
        }
    ]);