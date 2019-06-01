/* global angular */

angular
    .module("EnvironmentApp")
    .controller("grupalAnalyticsCtrl", ["$scope",
        "$http",
        "$routeParams",
        function($scope, $http, $routeParams) {

            var API1 = "/api/v2/biofuels-production";
            var API2 = "/api/v1/e-car-statics";
            var API3 = "/api/v2/issue-dioxid";
            var biofuels = [];
            var ecarstatics = [];
            var issues = [];

            $http.get(API1).then(function(biofuel) {
                $http.get(API2).then(function(car) {
                    $http.get(API3).then(function(issue) {
                        console.log("Data Received: " + JSON.stringify(biofuel.data, null, 2));
                        console.log("Data Received: " + JSON.stringify(car.data, null, 2));
                        console.log("Data Received: " + JSON.stringify(issue.data, null, 2));

                        biofuels = biofuel.data;
                        ecarstatics = car.data;
                        issues = issue.data;


                        var all = biofuels.concat(ecarstatics).concat(issues);

                        var years = all.map(function(item) {

                            var newItem = item.year;
                            return parseInt(newItem);

                        });


                        let sinRepetidos = years.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual).sort();

                        var mountNorway = sinRepetidos.map(function(year) {
                            var existsVehicles = ""
                            ecarstatics.forEach(function(n) {
                                if (n.country == "Norway" && n.year == year) {
                                    existsVehicles = n.existsVehicles;
                                }
                            });

                            return existsVehicles;

                        });

                        var issueAlbania = sinRepetidos.map(function(year) {
                            var issue_liquid = ""
                            issues.forEach(function(n) {
                                if (n.country == "Albania" && n.year == year) {
                                    issue_liquid = parseFloat(n.issue_liquid_fuel.replace(".", "").replace(",", "."));
                                }
                            });

                            return issue_liquid;

                        });

                        var issueAndorra = sinRepetidos.map(function(year) {
                            var issue_liquid = ""
                            issues.forEach(function(n) {
                                if (n.country == "Andorra" && n.year == year) {
                                    issue_liquid = parseFloat(n.issue_liquid_fuel.replace(".", "").replace(",", "."));
                                }
                            });

                            return issue_liquid;

                        });

                        console.log(sinRepetidos);
                        console.log(issueAlbania);

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

                        var naturalUSA = sinRepetidos.map(function(year) {
                            var dryNaturalGas = ""
                            biofuels.forEach(function(n) {
                                if (n.country == "United States" && n.year == year) {
                                    dryNaturalGas = n.dryNaturalGas;
                                }
                            });

                            return dryNaturalGas;

                        });

                        Highcharts.chart('grupal_container', {
                            chart: {
                                type: 'column'
                            },
                            title: {
                                text: 'Grupal Integration'
                            },
                            xAxis: {
                                categories: sinRepetidos,
                                crosshair: true
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: ''
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
                                name: 'United States',
                                data: naturalUSA

                            }, {
                                name: 'Norway',
                                data: mountNorway

                            }, {
                                name: 'Albania',
                                data: issueAlbania

                            }, {
                                name: 'Andorra',
                                data: issueAndorra

                            }]
                        });
                    });

                });
            });
        }
    ]);
