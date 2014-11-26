/*global io:false */
'use strict';
angular.module('core').controller('HomeController', ['$scope', '$rootScope', '$stateParams', 'imageService', 'dialogueService',
  function($scope, $rootScope, $stateParams, imageService, dialogueService) {


    $scope.slides = [
      'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
      'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
      'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
      'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
    ];


    //Name space the scope.
    $scope.homeModel = {};
    $scope.homeModel.curImageNum = 0;
    $scope.homeModel.curCatNum = 4;
    var curImageNum = 0;

    //Stick config settings on the scope so the ui binding can use. @todo - better way? convert to service?
    $scope.configSettings = ApplicationConfiguration.configSettings;

    /**
     * User has clicked on a thumb.
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    $scope.selectImage = function(n) {
      //console.log("you have selected thumb number " + n);
      //dialogueService.displayUserMsg('congrats!', 'you have selected thumb number ' + n);
      $scope.homeModel.curImageNum = n;
      $scope.homeModel.selectedImage = $scope.homeModel.images[$scope.homeModel.curImageNum].image;

    }

    /**
     * User has clicked on a left menu link.
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    $scope.selectACategory = function(n) {

      $scope.homeModel.curCatNum = n;
      $scope.homeModel.images = $scope.homeModel.categoryies.category[n].pic;
      $scope.selectImage(0);
    }

    /**
     * listen for dispatch from outside this module. select cat and load 1st image.
     * @param  {[type]} event [description]
     * @param  {[type]} mass  [description]
     * @return {[type]}       [description]
     */
    $rootScope.$on('categorySelected', function(event, mass) {
      $scope.selectACategory(mass);
    });

    $scope.getNextImage = function() {
      curImageNum++;
      if (curImageNum === $scope.homeModel.images.length) {
        curImageNum = 0;
      }
      $scope.selectImage(curImageNum);
    }

    $scope.getPrevImage = function() {
      curImageNum--;
      if (curImageNum === -1) {
        curImageNum = $scope.homeModel.images.length - 1;
      }
      $scope.selectImage(curImageNum);
    }

    /**
     * apply the remote data to the local scope.
     * @param  {[type]} images [description]
     * @return {[type]}        [description]
     */
    function applyRemoteData(response) {
      var images = response.data;
      var catN = $scope.homeModel.curCatNum;
      $scope.homeModel.categoryies = images.categoryies;
      $scope.homeModel.images = images.categoryies.category[catN].pic;
      $scope.homeModel.selectedImage = images.categoryies.category[catN].pic[0].image;

      //let other views know the data has been defined. (top menu).
      $rootScope.$broadcast('categoryiesDefined', $scope.homeModel.categoryies);
    }

    /**
     * display message to the user.
     * @param  {[type]} msg [description]
     * @return {[type]}     [description]
     */
    function displayErrorMsg(msg) {
      dialogueService.displayUserMsg('Something is not good', msg);
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
      //console.log('find post. write code to get it!');
    }

    //----------------------------------------------------------------service API

    /**
     * Get the objects by calling a service.
     * @return {[type]} [description]
     */
    $scope.getImages = function() {
      // imageService.getImages()
      //   .then(serviceHandler)
      //   .then(findPost);

      imageService.getBobImages()
        .then(serviceHandler)
        .then(findPost);
    };

    /**
     * get the intial objects.
     */
    $scope.getImages(ApplicationConfiguration.configSettings.serviceGetImages);

  }

]).directive('carousel', [function() {
  return {

  }
}]).directive('slide', [function() {
  return {

  }
}]);
