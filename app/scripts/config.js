/* exported ApplicationConfiguration */
'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
  // Init module configuration options
  var applicationModuleName = 'myApplication';
  var applicationModuleVendorDependencies = ['ngResource',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'app.directives',
    'app.services',
    'app.filters',
    'rt.debounce'
  ];

  //Adjust fb id per env. TODO update wih corrct id's. Adjust env string logic.
  var siteDomain = '//' + window.location.hostname,
    facebookApplicationId = '1452601328335321';

  if (siteDomain.toLowerCase().indexOf('localhost') !== -1) {
    facebookApplicationId = '1452631758332278';
  } else if (siteDomain.toLowerCase().indexOf('staging') !== -1) {
    facebookApplicationId = '12345';
  } else if (siteDomain.toLowerCase().indexOf('dev-') !== -1) {
    facebookApplicationId = '1452614498334004';
  }

  /**
   * config - put hardcoded values here.
   * @type {Object}
   */
  var configSettings = {
    messages: {
      errormsg: 'There was an Error. Please try again Later'
    },
    fbAppId: facebookApplicationId
  };

  // Add a new vertical module
  var registerModule = function(moduleName, depArray) {
    if (!depArray) {
      depArray = [];
    }
    // Create angular module and add dependencies.
    angular.module(moduleName, depArray);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule,
    configSettings: configSettings
  };
})();

