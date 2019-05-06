 /* global angular*/
            
var app = angular.module("Issue-DioxidApp", ["ngRoute"]).config(function($routeProvider){
    
                        $routeProvider.when("/", {
                                        
                                        controller: "ListCtrl",
                                        templateUrl: "list.html"
                        });
});
            
console.log("App init");