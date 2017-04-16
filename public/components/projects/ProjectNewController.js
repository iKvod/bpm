/**
 * Created by rafa on 15/04/2017.
 */
angular.module('bmp')
  .controller('ProjectNewController',
    function($scope, $mdDialog, $interval) {

      var vm = this;

      vm.docs = [{id: '1', title: 'Документ 1'}, {id: '2', title: 'Документ 2'}]

    });