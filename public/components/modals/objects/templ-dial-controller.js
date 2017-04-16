/**
 * Created by rafa on 15/04/2017.
 */
angular.module('bmp')
  .controller('TemplModalController',
    function($scope, $mdDialog,  $interval, $http, Upload) {
      var vm = this;

      vm.link = '';








      vm.hide = function() {
        $mdDialog.hide();
      };

      vm.cancel = function() {
        $mdDialog.cancel();
      };

      vm.answer = function() {
        $mdDialog.hide(vm.link);
      };

    });

