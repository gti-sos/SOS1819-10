/* global angular */

var app = angular.module("EnvironmentApp");

app.controller("moviesCtrl", ["$scope", "$http", function($scope, $http) {


    console.log("List Movies Controller initialized.");
    var API1 = "/api/v2/biofuels-production"
    var API2 = "https://sos1819-02.herokuapp.com/api/v1/movies-stats/";
    var movies = [];
    var biofuels = [];
    refresh();

    function refresh() {

        $http.get(API1).then(function(biofuel) {
            $http.get(API2).then(function(movie) {


                $scope.movies = movie.data;
                movies = movie.data;
                biofuels = biofuel.data;

                var all = biofuels.concat(movies);

                var years = all.map(function(item) {

                    var newItem = item.year;
                    return parseInt(newItem);

                });

                var sinRepetidos = years.filter((valor, indiceActual, arreglo) => arreglo.indexOf(valor) === indiceActual).sort();

                var nomUS = sinRepetidos.map(function(year) {
                    var nomination = 0
                    movies.forEach(function(n) {
                        if (n.country == "EEUU" && n.year == year) {
                            nomination = n.movienomination;
                        }
                    });
                    return nomination;

                });

                var nomNZ = sinRepetidos.map(function(year) {
                    var nomination = 0
                    movies.forEach(function(n) {
                        if (n.country == "Nueva Zelanda" && n.year == year) {
                            nomination = n.movienomination;
                        }
                    });
                    return nomination;

                });

                var nomI = sinRepetidos.map(function(year) {
                    var nomination = 0
                    movies.forEach(function(n) {
                        if (n.country == "India" && n.year == year) {
                            nomination = n.movienomination;
                        }
                    });
                    return nomination;

                });

                var nomFR = sinRepetidos.map(function(year) {
                    var nomination = 0
                    movies.forEach(function(n) {
                        if (n.country == "FR" && n.year == year) {
                            nomination = n.movienomination;
                        }
                    });
                    return nomination;

                });

                var naturalChina = sinRepetidos.map(function(year) {
                    var dryNaturalGas = 0
                    biofuels.forEach(function(n) {
                        if (n.country == "China" && n.year == year) {
                            dryNaturalGas = n.dryNaturalGas;
                        }
                    });
                    return dryNaturalGas;

                });

                var naturalBrazil = sinRepetidos.map(function(year) {
                    var dryNaturalGas = 0
                    biofuels.forEach(function(n) {
                        if (n.country == "Brazil" && n.year == year) {
                            dryNaturalGas = n.dryNaturalGas;
                        }
                    });

                    return dryNaturalGas;

                });
                var naturalCanada = sinRepetidos.map(function(year) {
                    var dryNaturalGas = 0
                    biofuels.forEach(function(n) {
                        if (n.country == "Canada" && n.year == year) {
                            dryNaturalGas = n.dryNaturalGas;
                        }
                    });

                    return dryNaturalGas;

                });

                var colors = Highcharts.getOptions().colors;
                Highcharts.chart('container_movies', {

                    chart: {
                        type: 'streamgraph',
                        marginBottom: 30,
                        zoomType: 'x'
                    },

                    // Make sure connected countries have similar colors
                    colors: [
                        colors[0],
                        colors[1],
                        colors[2],
                        colors[3],
                        colors[4],
                        // East Germany, West Germany and Germany
                        Highcharts.color(colors[5]).brighten(0.2).get(),
                        Highcharts.color(colors[5]).brighten(0.1).get(),

                        colors[5],
                        colors[6],
                        colors[7],
                        colors[8],
                        colors[9],
                        colors[0],
                        colors[1],
                        colors[3],
                        // Soviet Union, Russia
                        Highcharts.color(colors[2]).brighten(-0.1).get(),
                        Highcharts.color(colors[2]).brighten(-0.2).get(),
                        Highcharts.color(colors[2]).brighten(-0.3).get()
                    ],

                    title: {
                        floating: true,
                        align: 'left',
                        text: 'Nomination Movies and Dry Natural Gas by Year'
                    },
                    subtitle: {
                        floating: true,
                        align: 'left',
                        y: 30
                    },

                    xAxis: {
                        maxPadding: 0,
                        type: 'category',
                        crosshair: true,
                        categories: sinRepetidos.map(function(item) { return String(item) }),
                        labels: {
                            align: 'left',
                            reserveSpace: false,
                            rotation: 270
                        },
                        lineWidth: 0,
                        margin: 20,
                        tickWidth: 0
                    },

                    yAxis: {
                        visible: false,
                        startOnTick: false,
                        endOnTick: false
                    },

                    legend: {
                        enabled: false
                    },
                    plotOptions: {
                        series: {
                            label: {
                                minFontSize: 5,
                                maxFontSize: 15,
                                style: {
                                    color: 'rgba(255,255,255,0.75)'
                                }
                            }
                        }
                    },

                    // Data parsed with olympic-medals.node.js
                    series: [{
                        name: 'UUEE',
                        data: nomUS

                    }, {
                        name: 'Nueva Zelanda',
                        data: nomNZ

                    }, {
                        name: 'India',
                        data: nomI

                    }, {
                        name: 'Francia',
                        data: nomFR

                    }, {
                        name: 'China',
                        data: naturalChina

                    }, {
                        name: 'Brazil',
                        data: naturalBrazil

                    }, {
                        name: 'Canada',
                        data: naturalCanada

                    }],

                    exporting: {
                        sourceWidth: 800,
                        sourceHeight: 600
                    }

                });
            });

        });
    }
}]);
