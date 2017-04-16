'use strict';

angular.module('bmp')
  .controller('AuthController', ['$state', '$stateParams', 'AuthenticationService','$mdDialog','$location',
    function ($state, $stateParams, AuthenticationService, $interval, $mdDialog,$location) {
      var vm = this;

      vm.username = null;
      vm.password = null;

      vm.login = login;

      initController();

      function initController() {
        AuthenticationService.Logout();
      };

      function login() {
        vm.loading = true;
        AuthenticationService.Login(vm.username, vm.password, function (result) {
          if (result === true) {
            $state.go('objects');
            // $location.path('/objects');
          } else {
            vm.error = 'Username or password is incorrect';
            vm.loading = false;
            console.log(vm.error);
          }
        });
      };




  }]);

