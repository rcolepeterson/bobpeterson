'use strict';

// Setting up route
// http://angular-ui.github.io/ui-router/sample/#/contacts/42 - (@todo learn about nested routes)
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider.
    state('home', {
      url: '/:id',
      templateUrl: 'scripts/modules/core/views/home.view.html'
    });
  }
]);
