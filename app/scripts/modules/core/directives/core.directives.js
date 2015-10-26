'use strict';

/**
 * All module - home specific directives should go in here.
 */

/**
 * Add home directives here.
 * @type {[type]}
 */
var directives = angular.module('core.directives', []);

directives.directive('thumbscroller', function($timeout) {
  return {
    restrict: 'AE',
    link: function(scope, element) {

      $timeout(function() {
        element.mThumbnailScroller({
          axis: 'x', //change to "y" for vertical scroller
          // type:'click-25',
        });
      }, 0);
    },
  };
});
