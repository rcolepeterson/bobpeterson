'use strict';
/**
 * Test
 * @type {[type]}
 */
var directives = angular.module('about.directives', []);
directives.directive('helloAboutWorld', function() {
  return {
    restrict: 'AE',
    replace: 'true',
    template: '<h3>About: Hello World!!</h3>'
  };
});
