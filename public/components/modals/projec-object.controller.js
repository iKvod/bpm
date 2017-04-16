/**
 * Created by rafa on 15/04/2017.
 */
angular.module('bmp')
  .controller('AllObjectController',
    function($scope, $mdDialog, $http, objects) {
      var vm = this;

      console.log(objects);

      vm.objects = objects.data;
      vm.categories = objects.data.categories;
      vm.templates = objects.data.object_templates;
      console.log(vm.categories);
      console.log(vm.templates);



      var template = {
        id: '',
        name: ''
      };
      var templ = [];
      vm.addTemplate = function (temlId, name) {
        template.id  = temlId;
        template.name = name;
        console.log(template);
        templ.push(template);
        console.log(templ);
        // template.id = '';
        // template.name = '';
      };

      vm.showTemplate = function(){
        $mdDialog.hide(templ);
      };


      vm.hide = function() {
        $mdDialog.hide();
      };

      vm.cancel = function() {
        $mdDialog.cancel();
      };

      vm.answer = function(answer) {
        $mdDialog.hide(answer);
      };
    });


// /**
//  * Created by rafa on 15/04/2017.
//  */
// angular.module('bmp')
//   .controller('ModalDialController',['$scope', '$mdDialog', '$interval',
//     function($scope, $mdDialog, $interval) {
//
//
//       vm.hide = function() {
//         $mdDialog.hide();
//       };
//
//       vm.cancel = function() {
//         $mdDialog.cancel();
//       };
//
//       vm.answer = function(answer) {
//         $mdDialog.hide(answer);
//       };
//     }]);
//

