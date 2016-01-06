/*global ApplicationConfiguration:false */
'use strict';
angular.module('core').controller('HomeController', ['$scope', '$rootScope', '$location', '$stateParams', 'imageService', 'dialogueService',
  function($scope, $rootScope, $location, $stateParams, imageService, dialogueService) {

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

    };

    $scope.hideshowsidebar = function(){
      var pos = $(".sidebar")[0]._gsTransform;
      var dist = $(".sidebar").width() - 0;
      //console.log(pos.x)
      var ease = 'Quad.easeOut';
      var tweenProps = {width:'83.33333%', marginLeft:'16.66667%',delay:0};
      if ( pos && pos.x < 0 ){
        //close
        TweenLite.to($(".sidebar"), .35, {x:0, ease:ease, delay:.35});
        TweenLite.to($(".rightside"), .35, tweenProps, 1);
        TweenLite.to($(".hide-side-bar"), .35, {rotation:0, ease:ease});
        // TweenLite.to($("#my-thumbs-list"), .35, {x:0, delay:0});
        return;
      }

      //TweenLite.to($(".sidebar"), .35, {width:'100%'});

      //open
      TweenLite.to($(".hide-side-bar"), .35, {rotation:180, ease:ease});
      // TweenLite.to($("#my-thumbs-list"), .35, {x:80, delay:0});

      TweenLite.to($(".sidebar"), .35, {x:-(280), ease:ease});
      TweenLite.to($(".rightside"), .35, {width:'100%', margin:0, delay:.35});

    }

    $scope.about = function(){
      TweenLite.to($(".sidebar"), .35, {width:'80%'});
    }

    $scope.shareFB = function(){
      fbShare('http://www.bobpeterson.com','bobpeterson','Bob Peterson is the Seattle Photographer who became famous taking pictures for Sports Illustrated, Life and Nike.', 'http://bobpeterson.com/photographer/images/NIKE/NIKE01.jpg', 520, 350);
    }

    $scope.shareTwitter = function(){
      twitShare('Bob Peterson is the Seattle Photographer who became famous taking pictures for Sports Illustrated, Life and Nike.', 'http://www.bobpeterson.com');
    }

    function fbShare(url, title, descr, image, winWidth, winHeight) {
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + 0 + ',left=' + 0 + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    }

    function twitShare(desc, shareUrl) {
        // var winTop = (screen.height / 2) - (winHeight / 2);
        // var winLeft = (screen.width / 2) - (winWidth / 2);
        // window.open('http://bit.ly/1VHqj9F?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);

        window.open('http://twitter.com/share?text=' + desc + '&url=' + shareUrl, 'share', 'toolbar=0,status=0,width=680,height=380');
    }

    /**
     * User has clicked on a left menu link.
     * @param  {[type]} n [description]
     * @return {[type]}   [description]
     */
    $scope.selectACategory = function(n) {
      $location.path('/' + $scope.homeModel.categoryies.category[n].id);
    };

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
    };

    $scope.getPrevImage = function() {
      curImageNum--;
      if (curImageNum === -1) {
        curImageNum = $scope.homeModel.images.length - 1;
      }

      $scope.selectImage(curImageNum);
    };

    /**
     * apply the remote data to the local scope.
     * @param  {[type]} images [description]
     * @return {[type]}        [description]
     */
    function applyRemoteData(response) {
      var images = response.data;

      $scope.homeModel.categoryies = images.categoryies;
      $scope.homeModel.curCatNum = findPost();
      var catN = $scope.homeModel.curCatNum;

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

    // function displayErrorMsg(msg) {
    //   dialogueService.displayUserMsg('Something is not good', msg);
    // }

    /**
     * Service call back.
     * @param  {[type]} result [description]
     * @return {[type]}        [description]
     */
    var serviceHandler = function(result) {
      //if result === error display it ...
      //displayErrorMsg('ouch ' + ApplicationConfiguration.configSettings.messages.errormsg)
      applyRemoteData(result);
    };

    /**
     * Code to grab the diretlink fromt the state params
     * @return {[type]} [description]
     */
    var findPost = function() {

      if ($stateParams) {
        var clients = $scope.homeModel.categoryies.category;
        var elementPos = clients.map(function(x) {return x.id;}).indexOf($stateParams.id);
        var val = elementPos;
        if (val !== -1) {
          return val;
        }
      }

      return 4;
    };

    //----------------------------------------------------------------service API

    /**
     * Get the objects by calling a service.
     * @return {[type]} [description]
     */
    $scope.getImages = function() {
      imageService.getImages()
        .then(serviceHandler);

      //   .then(findPost);

      // imageService.getBobImages()
      //   .then(serviceHandler);
      //.then(findPost)
    };
    /**
     * get the intial objects.
     */
    $scope.getImages(ApplicationConfiguration.configSettings.serviceGetImages);

  },

]);
