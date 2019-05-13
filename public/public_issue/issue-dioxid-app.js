 /* global angular*/

 var app = angular.module("Issue-DioxidApp", ["ngRoute"]).config(function($routeProvider) {

     $routeProvider.when("/", {

         controller: "ListCtrl",
         templateUrl: "list.html"

     }).when("/edit/:country/:year", {

         controller: "EditCtrl",
         templateUrl: "edit.html"

     }).when("/pag/:limit/:offset", {

         controller: "PagCtrl",
         templateUrl: "pag.html"
     });
 });

 console.log("App init");
 