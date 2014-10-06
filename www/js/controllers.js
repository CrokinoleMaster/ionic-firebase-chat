'use strict'
angular.module('starter')
.controller('ChatController', ['$scope', '$firebase', 'fbUrl', '$ionicModal', '$ionicScrollDelegate',function($scope, $firebase, fbUrl, $ionicModal, $ionicScrollDelegate) {
  var ref = new Firebase(fbUrl);
  var sync = $firebase(ref);

  var chatList = sync.$asArray();

  $scope.currentUser = {userColor: randomColor({luminosity: 'dark'}), username: '', message: ''};

  $scope.chatList = chatList;

  $scope.sendMessage = function() {
    chatList.$add($scope.currentUser);
    $scope.currentUser.message = '';
  };

  $scope.$watch('chatList', function(val) {
    // setTimeout(function() {
      $ionicScrollDelegate.resize();
      $ionicScrollDelegate.scrollBottom();
    // }, 300);
  }, true);


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
