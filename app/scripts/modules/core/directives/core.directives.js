'use strict';
/**
 * Test
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



/**
 * Post Item used in the HI gallery
 * @return {[type]} [description]
 */
directives.directive('post', function() {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'scripts/modules/core/tpl/post.html',
    scope: {
      image: '=content'
    },
    link: function(scope, element, attr) {

    }
  }
});

/**
 * adds launching modal API. expecting a data object and a template.
 * TODO - is this specific to the image object? can't remember figure out. and or abstract.
 */
directives.directive('overlay', function($compile, $http, overlayService) {
  return {
    restrict: 'A',

    controller: function($scope) {
      $scope.launch = function(template) {
        overlayService.launch($scope.image, template);
      };
    }
  };
});

directives.directive('masonry', function($parse) {
  return {
    restrict: 'AC',
    link: function(scope, elem, attrs) {
      scope.items = [];
      var container = elem[0];
      var options = angular.extend({
        itemSelector: '.item'
      }, JSON.parse(attrs.masonry));

      var masonry = scope.masonry = new Masonry(container, options);

      var debounceTimeout = 0;
      scope.update = function() {
        if (debounceTimeout) {
          window.clearTimeout(debounceTimeout);
        }
        debounceTimeout = window.setTimeout(function() {
          debounceTimeout = 0;

          masonry.reloadItems();
          masonry.layout();

          elem.children(options.itemSelector).css('visibility', 'visible');
        }, 120);
      };
    }
  };
});
directives.directive('masonryTile', function() {
  return {
    restrict: 'AC',
    link: function(scope, elem) {
      elem.css('visibility', 'hidden');
      var master = elem.parent('*[masonry]:first').scope(),
        update = master.update;

      imagesLoaded(elem.get(0), update);
      elem.ready(update);
    }
  };
});
