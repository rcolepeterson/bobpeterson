'use strict';

// Setting up route
angular.module('about').config(['$stateProvider',
  function($stateProvider) {

    // State routing
    $stateProvider.
    state('about', {
      url: '/about',
      templateUrl: 'scripts/modules/about/views/about.view.html'
    })

  }
]);
