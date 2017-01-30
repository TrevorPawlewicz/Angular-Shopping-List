var app = angular.module('groceryListApp', ["ngRoute"]);


app.config(function($routeProvider){
    // provide routes and link them to controllers:
    $routeProvider
        .when("/",{
            templateUrl: "views/groceryList.html",
            controller: "GroceryListItemsController"
        })
        .when("/addItem",{
            templateUrl: "views/addItem.html",
            controller: "GroceryListItemsController"
        })
        .otherwise({
            redirectTo: "/"
        })
});



app.controller("HomeController", ["$scope", function($scope) {
    $scope.appTitle = "Grocery List";
}]);




app.controller("GroceryListItemsController", ["$scope", function($scope){

    $scope.groceryItems = [
        {completed: true, itemName: 'milk', date: '2014-10-00'},
        {completed: true, itemName: 'cookies', date: '2014-10-01'},
        {completed: true, itemName: 'ice cream', date: '2014-10-02'},
        {completed: true, itemName: 'potatoes', date: '2014-10-02'},
        {completed: true, itemName: 'cereal', date: '2014-10-03'},
        {completed: true, itemName: 'bread', date: '2014-10-03'}
    ]
}]);
