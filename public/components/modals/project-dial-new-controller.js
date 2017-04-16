/**
 * Created by rafa on 15/04/2017.
 */
angular.module('bmp')
  .controller('ModalDialController',
    function($scope, $mdDialog,  $interval, $http, Upload) {
    var vm = this;


    vm.peoples = [1,2,3,4];

    vm.proj = {
      name: 'Название проекта',
      desc: '',
      manId: '',
      document: [],
    };

    vm.fileName = ''

    vm.setFiles = function (file, errFile) {
      if(file){
        vm.proj.document.push(file);
        console.log(file)
      }
      if(errFile){
        console.log(errFile);
      }
      // console.log(file.name.splice(0,9));
      // if(errFile){
      //   console.log(errFile)
      //
      // } else {
      //
      // }
    };


    //file uploading



      vm.createProject = function (proj) {
        if(proj.document && proj.document.length){

          // console.log(proj);

          Upload.upload({
            url: '',
            data: {
              files: proj.document,
              projData: {
                name: proj.name,
                desc: proj.desc,
                manId: proj.manId
              }
            }
          })
            .then(function (response) {
              $timeout(function () {
                vm.result = response.data;
                $mdDialog.hide()
              });
            }, function (response) {
              console.log(response);
              if (response.status > 0) {
                vm.errorMsg = response.status + ': ' + response.data;
              }
            }, function (evt) {
              vm.progress =
                Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
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

