angular.module('iceCreamApp', []).controller('MainController', function($scope) {
      $scope.products = [
        {
          name: 'Ice Cream',
          defaultImage: 'images/front_1.jpg',
          prices: { Small: 50, Medium: 70, Large: 90 },
          flavors: [
            { name: 'Vanilla', image: 'images/vanilla_flavor.png', color: 'beige' },
            { name: 'Chocolate', image: 'images/chocolate_flavor.png', color: 'saddlebrown' },
            { name: 'Strawberry', image: 'images/strawberry_flavor.png', color: 'pink' }
          ]
        },
        {
          name: 'Popsicle',
          defaultImage: 'images/front_2.png',
          prices: { Small: 30, Medium: 45, Large: 60 },
          flavors: [
            { name: 'Orange', image: 'images/orange_flavor.png', color: 'orange' },
            { name: 'Grape', image: 'images/grapes.png', color: 'purple' },
            { name: 'Lime', image: 'images/lime_flavor.png', color: 'green' }
          ]
        }
      ];

      $scope.sizes = ['Small', 'Medium', 'Large'];
      $scope.currentPage = 'home';
      $scope.cartVisible = false;
      $scope.quantity = 1;
      $scope.cartItems = [];
      $scope.orderSummary = [];
      
      $scope.viewProduct = function(product) {
        $scope.selectedProduct = product;
        $scope.selectedFlavor = product.flavors[0];
        $scope.selectedSize = $scope.sizes[0];
        $scope.updateImageSize();
        $scope.currentPage = 'product';
      };

      $scope.selectFlavor = function(flavor) {
        $scope.selectedFlavor = flavor;
      };

      $scope.updateImageSize = function() {
        if ($scope.selectedSize === 'Small') $scope.imageSize = 100;
        else if ($scope.selectedSize === 'Medium') $scope.imageSize = 150;
        else if ($scope.selectedSize === 'Large') $scope.imageSize = 200;
      };

     $scope.addToCart = function() {
  const size = $scope.selectedSize;
  const flavor = $scope.selectedFlavor;
  const product = $scope.selectedProduct;
  const quantity = $scope.quantity || 1;
  const price = product.prices[size];

  // 🔍 Check if same item exists in cart
  const existingItem = $scope.cartItems.find(function(item) {
    return (
      item.product.name === product.name &&
      item.size === size &&
      item.flavor.name === flavor.name
    );
  });

  if (existingItem) {
    // ✅ Update existing item's quantity
    existingItem.quantity += quantity;
  } else {
    // ➕ Add new item
    $scope.cartItems.push({
      product: product,
      size: size,
      flavor: flavor,
      quantity: quantity,
      pricePerItem: price
    });
  }

  $scope.cartVisible = true;
};

   $scope.getCartTotal = function(items) {
  var target = items || $scope.cartItems; // use orderSummary if passed
  return target.reduce(function(total, item) {
    return total + item.quantity * item.pricePerItem;
  }, 0);
};

      $scope.proceedToCheckout = function() {
         if ($scope.cartItems.length === 0) {
    alert("Your cart is empty! Please add at least one item.");
    return;
  }
        $scope.cartVisible = false;
        $scope.currentPage = 'billing';
        $scope.billing = {};
      };

      $scope.placeOrder = function(form) {
        if (form.$valid) {
           $scope.orderSummary = angular.copy($scope.cartItems);
          $scope.orderPlaced = true;
          $scope.cartItems = [];
        }
      };
     
      $scope.removeFromCart = function(index) {
      $scope.cartItems.splice(index, 1);
      };

      $scope.goBackToCart = function() {
      $scope.currentPage = 'product';
      $scope.cartVisible = true;
      };

      $scope.goHome = function() {
      $scope.currentPage = 'home';
      $scope.orderPlaced = false;
      $scope.cartVisible = false;
      $scope.quantity = 1;
      $scope.cartItems = [];
      };
$scope.otherProduct = function() {
      $scope.currentPage = 'home';
   
      $scope.quantity = 1;
     
      };

    });