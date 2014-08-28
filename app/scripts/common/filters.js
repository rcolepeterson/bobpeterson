'use strict';
var filters = angular.module('app.filters', []);

filters.filter('cut', function() {
  return function(value, wordwise, max, tail) {
    if (!value) {
      return '';
    }
    max = parseInt(max, 10);
    if (!max) {
      return value;
    }
    if (value.length <= max) {
      return value;
    }

    value = value.substr(0, max);
    if (wordwise) {
      var lastspace = value.lastIndexOf(' ');
      if (lastspace !== -1) {
        value = value.substr(0, lastspace);
      }
    }
    return value + (tail || ' …');
  };
});

/**
 * Description:
 *     removes white space from text. useful for html values that cannot have spaces
 * Usage:
 *   {{some_text | nospace}}
 */
filters.filter('nospace', function() {
  return function(value) {
    return (!value) ? '' : value.replace(/ /g, '');
  };
});

/**
 * Description:
 *     retruns an array as a string.
 * Usage:
 *   {{some_text | tostring}}
 */
filters.filter('tostring', function() {
  return function(value) {
    value = value.replace(/[\[\]']+/g, '');
    value = value.replace(/"/g, "");
    value = value.replace(/,/g, " #");

    return (!value) ? '' : '#' + value;
  };
});

/**
 * Take a string and return everything b4 the 1st space. capitalize
 * @return {[type]} [description]
 */
filters.filter('firstname', function() {
  return function(value) {
    if (!value) {
      return '';
    }
    var firstspace = value.indexOf(' ');
    if (firstspace !== -1) {
      value = value.substr(0, firstspace);
    }
    return value
  };
});
