'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$rootScope', '$state',
  function($scope, $rootScope, $state) {
    //holder for objs
    $scope.headerModel = {};
    //hide top menu > categories if we are not at home.
    $scope.doHideCategories = false;

    /**
     * Listen for site wide dispatch that we have loaded the categories. define the categories on scope for top menu binding..
     */
    $scope.$on('categoryiesDefined', function(event, mass) {
      //closeTopMenu();
      $scope.headerModel.categoryies = mass;
    });

    //turn off topmenu cats if we are not @home.
    // $rootScope.$on('$stateChangeStart',
    //   function(event, toState, toParams, fromState, fromParams) {
    //     if ( toState.name === "about" )
    //     {
    //       $scope.doHideCategories = true;
    //     }else{
    //
    //       $scope.doHideCategories = false;
    //     }
    //   })

    //user has selected a cat. broad cast event.
    $scope.selectACategory = function(n) {
      $rootScope.$emit('categorySelected', n);
      closeTopMenu();
    }


    // $scope.setPage = function(page) {
    //   $state.transitionTo('/');
    // };


    //close menu on click
    $('.navbar-nav li a').click(function(event) {
      closeTopMenu();
    });

    /**
     * close top menu on click.
     * @return {[type]} [description]
     */
    function closeTopMenu()
    {
      var toggle = $(".navbar-toggle").is(":visible");
      if (toggle) {
        $(".navbar-collapse").collapse('hide');
      }
    }

  }
]);
