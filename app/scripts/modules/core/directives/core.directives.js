'use strict';

/**
 * All module - home specific directives should go in here.
 */


/**
 * Add home directives here.
 * @type {[type]}
 */
var directives = angular.module('core.directives', []);

directives.directive('helloWorld', function() {
  return {
    restrict: 'AE',
    replace: 'true',
    template: '<h3>Hello World!!</h3>'
  };
});

