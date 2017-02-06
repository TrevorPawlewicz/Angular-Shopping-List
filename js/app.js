var app = angular.module('groceryListApp', ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: "views/groceryList.html",
            controller: "HomeController"
        })
        .when("/addItem",{
            templateUrl: "views/addItem.html",
            controller: "GroceryListItemController"
        })
        .when('/addItem/edit/:id',{
            templateUrl: 'views/addItem.html',
            controller: 'GroceryListItemController'
        })
        .otherwise({
            redirectTo: "/"
        })
});

app.service("GroceryService", function($http){

    var groceryService = {};

    // data that would normally be pulled from a server with a RESTful request:
    //$http.get("http://example.com...");
    // we will use a data file:
    $http.get("data/server_data.json")
        .success(function(data){
            groceryService.groceryItems = data;

            for(var item in groceryService.groceryItems){
                groceryService.groceryItems[item].date = new Date(groceryService.groceryItems[item].date);
            }
        })
        .error(function(data, status){

        });

    groceryService.groceryItems = [];


    groceryService.findById = function(id){

        for (var item in groceryService.groceryItems){

            if (groceryService.groceryItems[item].id === id) {
                console.log(groceryService.groceryItems[item]);
                return groceryService.groceryItems[item];
            }
        }
    };

    //
    groceryService.getNewId = function() {

        if (groceryService.newId){
            groceryService.newId++;
            return groceryService.newId;
        } else {
            var maxId = _.max(groceryService.groceryItems, function(entry){ return entry.id;})
            groceryService.newId = maxId.id + 1;
            return groceryService.newId;
        }
    };

    // check / uncheck
    groceryService.markCompleted = function(entry){
        entry.completed = !entry.completed;
    };

    // DELETE
    groceryService.removeItem = function(entry) {
        $http.post("data/delete_item.json", {id: entry.id})
            .success(function(data){

                if(data.status){
                    var index = groceryService.groceryItems.indexOf(entry);
                    groceryService.groceryItems.splice(index, 1);
                }

            })
            .error(function(data, status){

            });
    };

    // SAVE
    groceryService.save = function(entry) {

        var updatedItem = groceryService.findById(entry.id);

        if (updatedItem) {
            $http.post("data/updated_item.json", entry)

                .success(function(data){
                    if (data.status == 1) {
                        updatedItem.completed = entry.completed;
                        updatedItem.itemName = entry.itemName;
                        updatedItem.date = entry.date;
                    }
                })
                .error(function(data, status){

                });

        } else {
            //entry.id = groceryService.getNewId(); local made ID we make

            // server made ID:
            $http.post("data/added_item.json", entry)
                .success(function(data){
                    entry.id = data.newId;
                })
                .error(function(data, status){

                });

            groceryService.groceryItems.push(entry);
        }

    };

    return groceryService;
});

app.controller("HomeController", ["$scope", "GroceryService", function($scope, GroceryService) {
    $scope.groceryItems = GroceryService.groceryItems;

    $scope.removeItem = function(entry) {
        GroceryService.removeItem(entry);
    };

    $scope.markCompleted = function(entry){
        GroceryService.markCompleted(entry);
    };

    // watch adds a listener to update our data on page
    $scope.$watch( function(){ return GroceryService.groceryItems; }, function(groceryItems) {
        $scope.groceryItems = groceryItems;
    });
}]);

app.controller("GroceryListItemController", ["$scope", "$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, GroceryService){

    // if no id, NEW entry:
    if (!$routeParams.id) {
        $scope.groceryItem = {id: 0, completed: false, itemName: "", date: new Date()};
    } else {
        //                  clone and save tht one
        $scope.groceryItem = _.clone(GroceryService.findById(parseInt($routeParams.id)));
    }

    $scope.save = function(){
        GroceryService.save( $scope.groceryItem );
        $location.path("/");
    };

}]);





// custom directive
app.directive("trevGroceryItem", function(){
    return {
        restrict: "E", // element
        templateUrl: "views/groceryItem.html"
    }
});
