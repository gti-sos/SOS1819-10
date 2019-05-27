/* global angular */

angular
    .module("EnvironmentApp")
    .controller("VisBiofuels", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API = "/api/v2/biofuels-production";
            var biofuels = [];
            var nodes = [];
            var edges = [];
            var count = 20;
            var count1 = 40;
            //var nodes = [];
            //var edges = [];
            $http.get(API).then(function(response) {
                // create an array with nodes
                biofuels = response.data;

                var years = biofuels.map(function(item) {

                    var newItem = item.year;
                    return newItem;

                });

                let sinRepetidos = years.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual).sort();

                sinRepetidos.forEach(function(year, indice) {
                    nodes.push({ id: indice, label: String(year) });
                    if (indice >= 1) {
                        edges.push({ from: indice - 1, to: indice });
                    }
                    biofuels.forEach(function(n) {
                        if (n.year == year) {
                            nodes.push({ id: count, label: n.country });
                            edges.push({ from: indice, to: count });
                            nodes.push({ id: count1, label: "Dry Natural Gas:" + String(n.dryNaturalGas) });
                            edges.push({ from: count, to: count1 });
                            count = count + 1;
                            count1 = count1 + 1;
                        }



                    });
                });
                //console.log(datas);
                //console.log(datas1);
                /*
                var nodes = [
                    { id: 1, label: 'Node 1' },
                    { id: 2, label: 'Node 2' },
                    { id: 3, label: 'Node 3' },
                    { id: 4, label: 'Node 4' },
                    { id: 5, label: 'Node 5' },
                    { id: 6, label: 'Node 6' }
                ];

                // create an array with edges
                var edges = [
                    { from: 1, to: 2 },
                    { from: 1, to: 3 },
                    { from: 2, to: 4 },
                    { from: 2, to: 5 },
                    { from: 4, to: 6 }

                ];
                */

                // create a network
                var container = document.getElementById('vis_biofuels');
                var data = {
                    nodes: nodes,
                    edges: edges
                };
                var network = new vis.Network(container, data, {});


                /*
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
            */
            });
        }
    ]);
