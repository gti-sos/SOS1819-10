/* global angular*/

var app = angular.module("EnvironmentApp", ["ngRoute"]).config(function($routeProvider) {

    $routeProvider

        .when("/", {
            templateUrl: "Inicio.html"
        })
        .when("/analytics", {
            templateUrl: "Analytics.html"
        })
        .when("/integrations", {
            templateUrl: "Integrations.html"
        })
        .when("/about", {
            templateUrl: "About.html"
        })

        //RUTAS CARLOS
        .when("/ui/v1/e-car-statics", {

            controller: "ListCtrl",
            templateUrl: "e-car-statics/list.html"

        }).when("/ui/v1/e-car-statics/edit/:country/:year", {

            controller: "EditCtrl",
            templateUrl: "e-car-statics/edit.html"

        }).when("/analytics/geochartsCarStatics", {

            controller: "GeoChartsCarStatics",
            templateUrl: "e-car-statics/analytics/geocharts-ecarstatics.html"

        }).when("/analytics/highchartsCarStatics", {

            controller: "HighchartsCarStatics",
            templateUrl: "e-car-statics/analytics/highcharts-ecarstatics.html"

        }).when("/analytics/uvcchartsCarStatics", {

            controller: "uvchartCarStatics",
            templateUrl: "e-car-statics/analytics/uv-ecarstatics.html"

        })

        //RUTAS FRAN

        .when("/ui/v1/issue-dioxid/:mensaje", {

            controller: "ListDioxidCtrl",
            templateUrl: "issue-dioxid/list-dioxid.html"

        }).when("/ui/v1/issue-dioxid/edit/:country/:year", {

            controller: "EditDioxidCtrl",
            templateUrl: "issue-dioxid/edit-dioxid.html"

        }).when("/ui/v1/issue-dioxid/pag/:limit/:offset", {

            controller: "PagDioxidCtrl",
            templateUrl: "issue-dioxid/pag-dioxid.html"

        }).when("/analytics/highchartsIssueDioxid", {

            controller: "GraphCrtl",
            templateUrl: "issue-dioxid/dygraphs.html"

        }).when("/analytics/geochartIssueDioxid", {

            controller: "GeoChartsIssueDioxid",
            templateUrl: "issue-dioxid/geochart.html"
        })

        //RUTAS FRAN ALONSO

        .when("/ui/v1/biofuels-production", {

            controller: "ListBiofuelsCtrl",
            templateUrl: "biofuels/list-biofuels.html"

        })

        .when("/ui/v1/biofuels-production/edit/:country/:year", {

            controller: "EditBiofuelsCtrl",
            templateUrl: "biofuels/edit-biofuels.html"

        })
        .when("/analytics/highchartsBiofuels", {

            controller: "HighchartsBiofuels",
            templateUrl: "biofuels/analytics/highcharts-biofuels.html"

        })
        .when("/analytics/geoChartsBiofuels", {

            controller: "GeoChartsBiofuels",
            templateUrl: "biofuels/analytics/geocharts-biofuels.html"

        })
        .when("/analytics/visBiofuels", {

            controller: "VisBiofuels",
            templateUrl: "biofuels/analytics/vis-biofuels.html"

        })

        //SOS INTEGRATIONS
        .when("/integrations/moviesCharts", {

            controller: "moviesCtrl",
            templateUrl: "biofuels/integrations/movies-stats.html"

        })
        .when("/integrations/suicidesCharts", {

            controller: "suicidesCtrl",
            templateUrl: "biofuels/integrations/suicide-rates.html"

        })
        .when("/integrations/carStatics", {

            controller: "carsCtrl",
            templateUrl: "biofuels/integrations/car-statics.html"

        })
        .when("/integrations/publicExpenses", {

            controller: "expensesCtrl",
            templateUrl: "biofuels/integrations/public-expenses.html"

        })
        .when("/integrations/pollutionStats", {

            controller: "pollutionCtrl",
            templateUrl: "biofuels/integrations/pollution-stats.html"

        })
        .when("/integrations/clubRankings", {

            controller: "clubRankingsCtrl",
            templateUrl: "biofuels/integrations/club-rankings.html"

        })
        //EXTERNAL APIS INTEGRATIONS
        .when("/integrations/airports", {

            controller: "airportsCtrl",
            templateUrl: "biofuels/integrations/airports.html"

        })
        .when("/integrations/norris", {

            controller: "norrisCtrl",
            templateUrl: "biofuels/integrations/norris.html"

        })
        //GRUPAL INTEGRATION
        .when("/integrations/grupalAnalytics", {

            controller: "grupalAnalyticsCtrl",
            templateUrl: "grupal-analytics/grupal-analytics.html"

        });
});


console.log("Biofuels App initialized");
console.log("Dioxid App initialized");
console.log("EcarStatics App initialized");
