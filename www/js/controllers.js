'use strict'
angular.module('starter')
.controller('ChatController', ['$scope', '$firebase', 'fbUrl', '$ionicModal', function($scope, $firebase, fbUrl, $ionicModal) {
  var ref = new Firebase(fbUrl);
  var sync = $firebase(ref);

  var chatList = sync.$asArray();

  $scope.currentUser = {username: '', message: ''};
  // chatList.$add({username: 'guest', message: "how are you"});

  $scope.chatList = chatList;

  $scope.sendMessage = function() {
    chatList.$add($scope.currentUser);
  };


  // show login modal
  $ionicModal.fromTemplateUrl('login.html', {
    scope: $scope,
    animation: 'slide-in-up',
    backdropClickToClose: false,
    hardwareBackButtonClose: false
  }).then(function(modal) {
    modal.show();
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    if ($scope.currentUser.username.length > 0) {
      $scope.modal.hide();
    }
  };
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  $scope.$on('modal.hidden', function() {
  });
  $scope.$on('modal.removed', function() {
  });

}]);
