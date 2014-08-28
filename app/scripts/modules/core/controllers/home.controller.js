/*global io:false */
'use strict';
angular.module('core').controller('HomeController', ['$scope', '$stateParams', 'imageService', 'dialogueService',
  function($scope, $stateParams, imageService, dialogueService) {

    //Name space the scope.
    $scope.homeModel = {}

    //Stick config settings on the scope so the ui binding can use. @todo - better way? convert to service?
    $scope.configSettings = ApplicationConfiguration.configSettings;

    /**
     * User has clicked on a thumb.
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    $scope.select = function(n) {
      dialogueService.displayUserMsg('congrats!', 'you have selected thumb number ' + n);
    }
    /**
     * User has clicked on a left menu link.
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    $scope.selectACategory = function(n) {
      dialogueService.displayUserMsg('congrats!', 'you have selected category number ' + n);
    }

    /**
     * apply the remote data to the local scope.
     * @param  {[type]} images [description]
     * @return {[type]}        [description]
     */
    function applyRemoteData(images) {
      $scope.homeModel.categoryies = images.categoryies;
      $scope.homeModel.images = images.categoryies.category[0].pic;
      $scope.homeModel.selectedImage = images.categoryies.category[0].pic[0].image;
    }

    /**
     * display message to the user.
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    function displayErrorMsg(msg) {
      dialogueService.displayUserMsg('Something is not good' , msg);
    }

    /**
     * Service call back.
     * @param  {[type]} result [description]
     * @return {[type]}        [description]
     */
    var serviceHandler = function(result) {
      //if result === error display it ...
      //displayErrorMsg('ouch ' + ApplicationConfiguration.configSettings.messages.errormsg)
      applyRemoteData(result);
    }

    /**
     * Code to grab the diretlink fromt eh url query string.
     * @return {[type]} [description]
     */
    var findPost = function() {
      console.log('find post. write code to get it!');
    }

    //----------------------------------------------------------------service API

    /**
     * Get the objects by calling a service.
     * @return {[type]} [description]
     */
    $scope.getImages = function() {
      imageService.getImages()
        .then(serviceHandler)
        .then(findPost);
    };

    /**
     * get the intial objects.
     */
    $scope.getImages(ApplicationConfiguration.configSettings.serviceGetImages);

  }

]);
