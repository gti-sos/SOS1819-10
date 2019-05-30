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

        }).when("/analytics/geoChartsCarStatics", {

            controller: "GeoChartsCarStatics",
            templateUrl: "e-car-statics/analytics/geocharts-ecarstatics.html"

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
        .when("/integrations/moviesCharts", {

            controller: "moviesCtrl",
            templateUrl: "biofuels/integrations/movies-stats.html"

        })
        .when("/integrations/suicidesCharts", {

            controller: "suicidesCtrl",
            templateUrl: "biofuels/integrations/suicide-rates.html"

        })
        .when("/integrations/prueba", {

            controller: "pruebaCtrl",
            templateUrl: "biofuels/integrations/prueba.html"

        });
});


console.log("Biofuels App initialized");
console.log("Dioxid App initialized");
console.log("EcarStatics App initialized");
