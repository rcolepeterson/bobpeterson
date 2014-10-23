'use strict';

angular.module('core').service('imageService', function($http, $q) {

  //http://www.bennadel.com/blog/2612-using-the-http-service-in-angularjs-to-make-ajax-requests.htm
  // Return public API.
  return ({
    getImages: getImages,
    getBobImages: getBobImages
  });

  // ---
  // PUBLIC METHODS.
  // ---

  /**
   * Get the images objects.
   */
  function getImages() {

    var serviceUrl = 'scripts/modules/core/api/photos.json';

    var request = $http({
      method: 'get',
      url: serviceUrl,
      params: {
        action: 'get'
      }
    });

    return (request.then(handleSuccess, handleError));

  }

  /**
   * Get the images objects 2. Shorthand for doing what the above code does.
   */
  function getBobImages() {

    var serviceUrl = 'scripts/modules/core/api/photos.json';
    return $http.get(serviceUrl);

  }


  // ---
  // PRIVATE METHODS.
  // ---

  // I transform the error response, unwrapping the application dta from
  // the API response payload.
  function handleError(response) {

    // The API response from the server should be returned in a
    // nomralized format. However, if the request was not handled by the
    // server (or what not handles properly - ex. server error), then we
    // may have to normalize it on our end, as best we can.
    if (!angular.isObject(response.data) ||
      !response.data.message
    ) {

      return ($q.reject('An unknown error occurred.'));

    }
    // Otherwise, use expected error message.
    return ($q.reject(response.data.message));

  }

  // transform the successful response, unwrapping the application data
  // from the API response payload.
  function handleSuccess(response) {
    return (response);
  }

});
