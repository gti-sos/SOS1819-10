/* global angular */

angular
    .module("EnvironmentApp")
    .controller("HighchartsBiofuels", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API = "/api/v2/biofuels-production";
            var biofuels = [];
            $http.get(API).then(function(response) {

                biofuels = response.data;

                var years = biofuels.map(function(item) {

                    var newItem = item.year;
                    return newItem;

                });

                let sinRepetidos = years.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual).sort();

                var naturalChina = sinRepetidos.map(function(year) {
                    var dryNaturalGas = ""
                    biofuels.forEach(function(n) {
                        if (n.country == "China" && n.year == year) {
                            dryNaturalGas = n.dryNaturalGas;
                        }
                    });
                    return dryNaturalGas;

                });

                var naturalBrazil = sinRepetidos.map(function(year) {
                    var dryNaturalGas = ""
                    biofuels.forEach(function(n) {
                        if (n.country == "Brazil" && n.year == year) {
                            dryNaturalGas = n.dryNaturalGas;
                        }
                    });

                    return dryNaturalGas;

                });
                var naturalCanada = sinRepetidos.map(function(year) {
                    var dryNaturalGas = ""
                    biofuels.forEach(function(n) {
                        if (n.country == "Canada" && n.year == year) {
                            dryNaturalGas = n.dryNaturalGas;
                        }
                    });

                    return dryNaturalGas;

                });

                var naturalUSA = sinRepetidos.map(function(year) {
                    var dryNaturalGas = ""
                    biofuels.forEach(function(n) {
                        if (n.country == "United States" && n.year == year) {
                            dryNaturalGas = n.dryNaturalGas;
                        }
                    });

                    return dryNaturalGas;

                });

                var naturalAustralia = sinRepetidos.map(function(year) {
                    var dryNaturalGas = ""
                    biofuels.forEach(function(n) {
                        if (n.country == "Australia" && n.year == year) {
                            dryNaturalGas = n.dryNaturalGas;
                        }
                    });

                    return dryNaturalGas;

                });

                Highcharts.chart('biofuels_container', {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Dry Natural Gas by Year'
                    },
                    xAxis: {
                        categories: sinRepetidos,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Billions Cubic Feet'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'China',
                        data: naturalChina

                    }, {
                        name: 'Brazil',
                        data: naturalBrazil

                    }, {
                        name: 'Canada',
                        data: naturalCanada

                    }, {
                        name: 'United States',
                        data: naturalUSA

                    }, {
                        name: 'Australia',
                        data: naturalAustralia

                    }]
                });



            });
        }
    ]);
