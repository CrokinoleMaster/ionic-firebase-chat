'use strict'
angular.module('starter')
.controller('ChatController', ['$scope', '$firebase', 'fbUrl', function($scope, $firebase, fbUrl) {
  var ref = new Firebase(fbUrl);
  var sync = $firebase(ref);

  var chatList = sync.$asArray();

  $scope.currentMessage = '';
  // chatList.$add({username: 'guest', message: "how are you"});

  $scope.chatList = chatList;

  $scope.sendMessage = function() {
    chatList.$add({username: 'guest', message: $scope.currentMessage});
  };

}]);
