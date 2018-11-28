angular.module('shopping',[])
.controller('MainCtrl',[
  '$scope','$http',
  
  function($scope,$http) {
      
      $scope.products = [];
      $scope.cart = [];  
      
      $scope.getAllProducts = function() {
          return $http.get('/shopping').success(function(data){
              $scope.products = data;
          });
      };
      $scope.getAllProducts();
      
      $scope.createProduct = function(product) {
          return $http.post('/shopping', product).success(function(data){
              $scope.products.push(data);
          });
      };
      
    $scope.addProduct = function() {
      var newProduct = {
          name:$scope.productName,
          price:$scope.productPrice,
          url:$scope.productPictureUrl,
          orders: 0 
      };
      $scope.createProduct(newProduct);
      $scope.productName = '';
      $scope.productPrice = '';
      $scope.productPictureUrl = '';
      
      $scope.getAllProducts();
    }
    
    $scope.delete = function(product) {
      $http.delete('/shopping/' + product._id)
        .success(function(data){
          console.log("It has successfully been deleted.");
      });
      $scope.getAllProducts();
    };
    
    $scope.purchase = function() {
      angular.forEach($scope.products, function(value,key) {
        if(value.selected) {
          $scope.order(value);
          $scope.cart.push(value);
        }
      });
    }
    
    $scope.order = function(product) {
        return $http.put('/shopping/' + product._id + '/order')
        .success(function(data){
          product.orders += 1;
        });
    }
  }
]);
