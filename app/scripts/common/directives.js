/*global possible:false, ApplicationConfiguration:false */
'use strict';
var directives = angular.module('app.directives', []);

directives.directive('imgError', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.bind('error', function() {
        $(this).attr('src',
          'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');
        $(this).unbind('error', this);
      });
    },
  };
});

directives.directive('imageloaded', function($timeout) {
  return {
    restrict: 'A',

    link: function(scope, element, attrs) {
      var cssClass = attrs.imageloaded;

      element.bind('load', function() {
        $timeout(function() {
          angular.element(element).addClass(cssClass);
        }, 1000);

      });
    },
  };
});

/**
 * center asset and resize. dependent on GSAP. and debounce.
 * @param  {[type]} debounce [description]
 * @return {[type]}          [description]
 */
directives.directive('vertcenter', function(debounce) {
  return {
    restrict: 'A',

    link: function(scope, element) {

      // Creates a function that will only get called once every 2 seconds:
      var fn = debounce(1000, function() {
        center();
      });

      var height;
      var width;

      // listen for image loading .. then center.
      element.bind('load', function() {
        //define new w and h.
        height = this.naturalHeight;
        width = this.naturalWidth;
        center();
      });

      //center asset.
      var center = function() {

        //offset for left side menu.
        var maxW = $(window).width() - 202;
        //offset for top and bottom menus
        var maxH = $(window).height() - 160;
        var props = calculateAspectRatioFit(width, height, maxW, maxH);

        if ($(window).width() > 480) {

          //resize.
          TweenLite.to(element, 0.25, {
            width: props.width,
            height: props.height,
            onComplete: doit
          }, 0);

        } else {
          doit();
        }

        //center.
        function doit() {
          var elH = parseInt(element.css('height'));
          var posY = ($(window).height() - elH) / 2;
          TweenLite.to(element, 0.45, {
            y: posY - 55
          });
        }
      };

      //maintain aspect ratio.
      var calculateAspectRatioFit = function(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        return {
          width: srcWidth * ratio,
          height: srcHeight * ratio,
        };
      };

      //listen for browser resize.
      window.addEventListener('resize', fn, false);
    },
  };
});

directives.directive('hereoimageloaded', function() {
  return {
    restrict: 'A',

    link: function(scope, element, attrs) {
      var cssClass = attrs.hereoimageloaded;

      scope.$watch('homeModel.selectedImage', function() {
        if (scope.homeModel.selectedImage) {
          angular.element(element).removeClass(cssClass);
          TweenLite.to($('.spinner'), 0.25, {
            opacity: 1,
          });
        }
      });

      element.bind('load', function() {
        angular.element(element).addClass(cssClass);
        TweenLite.to($('.spinner'), 0.1, {
          opacity: 0,
        });
      });
    },
  };
});

/**
 * Wraps the backstretch plugin.
 * http://srobbin.com/jquery-plugins/backstretch/
 * Stretch any image to fit the page or block-level element, and will automatically resize as the window or element size changes.
 * @return {[type]} [description]
 */
directives.directive('backstretch', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      $(element).backstretch(attr.backgroundurl);
    },
  };
});

/**
 * Share content via Facbook.
 * Dependent on https://github.com/rcolepeterson/ShareMeJS being included in the index.html
 * Dependent on //connect.facebook.net/en_US/all.js being included in the index.html
 *       TODO: Put share code in Angular service.
 *       Pass in dynamic content to share.
 * @return {[type]} [description]
 */
directives.directive('sharefacebook', function() {
  return {
    restrict: 'A',

    link: function(scope, element) {
      element.bind('click', function() {
        var shareTitle = 'my title',
          captionFacebook = 'Facebook caption',
          fbDesc = 'Have a journey to share? Enter the #WinExtraordinary Instagram photo contest, ' +
          'sponsored by Holiday Inn hotels, for your chance to win one of the daily ' +
          'sweepstakes prizes or the grand prize: your next journey. Enter now! ' +
          'bit.ly/XxXxXxX', // @todo update this
          shareUrl = 'http://' + window.location.hostname.toLowerCase(),
          picture = element.data('img'),
          facebookAppId = ApplicationConfiguration.configSettings.fbAppId;
        possible.ShareMe.openFacebook(
          shareTitle, fbDesc, captionFacebook, shareUrl, picture, facebookAppId
        );
      });
    },
  };
});

/*
 ShareMe.openTwitter = function(desc, shareUrl) {
        window.open('http://twitter.com/share?text=' + encodeURIComponent(desc) + '&url=' + encodeURIComponent(shareUrl), 'share', toolbar);
    };
 */
directives.directive('sharetwitter', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.bind('click', function() {
        var desc = 'Share a journey. Win a new one. Enter the #WinExtraordinary Instagram contest ' +
          'sponsored by @HolidayInn bit.ly/XxXxXxX', // @todo update url here
          shareUrl = 'bit.ly/XxXxXxX'; // @todo update this. JR rules!!!!!!!!!!!!!!!!!!!!!
        possible.ShareMe.openTwitter(
          desc, shareUrl
        );
      });
    },
  };
});

//Auto-collapse long text
//https://github.com/doukasd/AngularJS-Components/blob/master/dd-collapse-text/dd-collapse-text.js
directives.directive('ddcollapsetext', ['$compile', '$timeout',
  function($compile, $timeout) {
    return {
      restrict: 'A',
      replace: true,
      link: function(scope, element, attrs) {

        // start collapsed
        scope.collapsed = false;

        // create the function to toggle the collapse
        scope.toggle = function() {
          scope.collapsed = !scope.collapsed;
        };

        $timeout(function() {
          // get the value of the dd-collapse-text attribute
          attrs.$observe('ddcollapsetext', function(maxLength) {
            // get the contents of the element
            var text = element.text();

            if (text.length > maxLength) {
              // split the text in two parts, the first always showing
              var firstPart = String(text).substring(0, maxLength);
              var secondPart = String(text).substring(maxLength, text.length);

              // create some new html elements to hold the separate info
              var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
              var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
              var moreIndicatorSpan = $compile('<span ng-if="!collapsed">...</span>')(scope);
              var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "less" : "more"}}</span>')(scope);

              // remove the current contents of the element
              // and add the new ones we created
              element.empty();
              element.append(firstSpan);
              element.append(secondSpan);
              element.append(moreIndicatorSpan);
              element.append(toggleButton);
            }
          });
        });
      },
    };
  },
]);

/**
 * Initializes an overlay from the overlay service.
 * Note - Used for overlays that need to be more robust the what you get
 * from the dialogueService > displayUserMsg found @ /app/scripts/common/services.js
 * @todo- implement. the overlay service does not exist.
 *         it does in the HT discover progress and big data. port over cole.
 * @param  {[type]} $compile       [description]
 * @param  {[type]} $http          [description]
 * @param  {[type]} overlayService [description]
 * @return {[type]}                [description]
 */
directives.directive('overlay', function($compile, $http, overlayService) {
  return {
    restrict: 'A',
    controller: function($scope) {
      $scope.launch = function(template) {
        //overlay service expects data, a template and a controller.
        var data = {},
          controller = {};
        overlayService.launch(data, template, controller);
      };
    },
  };
});
