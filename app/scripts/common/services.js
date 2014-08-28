'use strict';
var services = angular.module('app.services', []);
services.service('dialogueService', function($modal) {
  // http://angular-ui.github.io/bootstrap/#/modal
  // Return public API.
  return ({
    displayUserMsg: displayUserMsg
  });

  /**
   * Launch modal and display msg to user. Like 'site is down' or an 'error has occured'.
   * http://angular-ui.github.io/bootstrap/#/modal
   * @param  {string} usermsg user facing message.
   */
  function displayUserMsg(userMsgHeader, userMsgBody) {
    $modal.open({
      templateUrl: 'scripts/modules/core/tpl/usermsg.html',
      backdrop: true,
      windowClass: 'modal',
      controller: function($scope, $modalInstance, userMsgHeader, userMsgBody) {
        $scope.userMsgHeader = userMsgHeader;
        $scope.userMsgBody = userMsgBody;
        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      },
      resolve: {
        userMsgHeader: function() {
          return userMsgHeader;
        },
        userMsgBody: function() {
          return userMsgBody;
        }
      }
    });
  }

});
