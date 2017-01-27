
var app = angular.module('shoppingApp', []);


app.controller("HomeController", ["$scope", function($scope) {

    $scope.appTitle = "Angular Shopping";
}]);


app.controller("GroceryListItemController", ["$scope", function($scope) {

    $scope.groceryItems = [
        {completed: true, itemName: 'milk', date: '2017-01-30'},
        {completed: true, itemName: 'cheese', date: '2017-01-10'},
        {completed: true, itemName: 'carrots', date: '2017-01-31'},
        {completed: true, itemName: 'bread', date: '2017-01-29'}
    ]
}]);
