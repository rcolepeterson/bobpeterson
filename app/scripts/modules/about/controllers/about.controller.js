/*global io:false */
'use strict';
angular.module('about').controller('AboutController', ['$scope',
  function($scope) {

      $scope.aboutModel = {};
      $scope.aboutModel.msg = 'You made it to About';

  }

]);
