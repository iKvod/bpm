'use strict';

angular.module('bmp')
  .controller('ProjectsController', ['$state', '$stateParams', '$http','$interval','$mdDialog',
    function ($state, $stateParams, $http, $interval, $mdDialog) {
      var url  = 'http://185.97.115.34:65040';

    var vm = this;
      vm.customFullScreen =true;

      // vm.data = [ "Item 1", "Item 2", "Item 3", "Item 4"];
      // vm.toggle = {};

    vm.listCategories  =  [''];
    vm.theme = 'red';

    // var isThemeRed = false;

    // $interval(function () {
    //   vm.theme = isThemeRed ? 'blue' : 'red';
    //
    //   isThemeRed = !isThemeRed;
    // }, 2000);

    vm.createProject = function(ev) {

      $mdDialog.show({
        controller: 'ModalDialController',
        controllerAs: 'vm',
        templateUrl: '/components/modals/project-new-tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: vm.customFullScreen
      })
        .then(function(answer) {
          vm.status = 'You said the information was "' + answer + '".';
          console.log(vm.status)

        }, function() {
          vm.status = 'You cancelled the dialog.';
          console.log(vm.status);
        });
    };


      vm.projects = [
        {title:'Проект1', body: 'ЛОАРволарлф рафдыоад о', task:[1, 2, 3, 4]},
        {title:'Проект 2', body: 'офлралор лаофрло ', task:[4, 2, 3,  5, 5]},
        {title:'Проект 3', body: 'лдофралодрфолыалфар ', task:[9,9,9]}
      ];

      vm.projects.activePanel = 1;

      vm.multiplePanels = {
        activePanels: [0,1]
      };

      vm.pushPanel = function() {
        vm.projects.push({title: 'Collapsible Group Item #4', body: 'Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.'});
      };


      vm.docs = [{id: '1', title: 'Документ 1'}, {id: '2', title: 'Документ 2'}];

      vm.docClicked = '';
      //TODO
      vm.deleteDoc = function(docId) {
        console.log(docId);
        $http({
          url: '',
          method: "POST",
          data: { id: docId}
        })
          .then(function (resp) {

            //TODO toast

          }, function (err) {

          });
      };


      vm.object = [];

    var newProject = {
      docId: '',
      suplier: '',
      manager: '',
      object: []
    };

    vm.addDoc = function(id){
      newProject.docId = id;
      console.log(id);
    };

    vm.addObject = function (obj) {
      newProject.object.push(obj);
    };

    //deletes object from the list
    vm.deleteObject = function (templId) {


    };

      vm.newObjeData = [];

    vm.getDataObject = function (tempId) {
      // console.log($stateParams.projectId)

      $http({
        url: url + '/api/add_project_object/' + $stateParams.projectId,
        method: 'POST',
        data: tempId
      })
        .then(function (res) {
          console.log(res);
        }, function (err) {
          console.log(err)
        });

      // console.log(tempId);
    };


    // tab 2
      
      //modal getting templates 
      var url  = 'http://185.97.115.34:65040';
      vm.getTemplates = function (ev) {
        $mdDialog.show({
          templateUrl: '/components/modals/getobjects.tmpl.html',
          controller: 'AllObjectController',
          controllerAs: 'vm',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: true,
          locals:{
            // dpts: dpts,
            // positions: positions
          },
          resolve: {
            objects: function ($http, ModalService) {
              console.log('Resolving');
              // return ModalService.getObjects.$promise;
              // return ModalService.getObjects();
              return $http({
                url: url + '/api/object_templates/list_all',
                method: "GET"
              })
                .then(function (resp) {
                  return resp;
                }, function (err) {
                  console.log(err);

                })
            }
          }
        })
          .then(function (resp) {
            console.log('Массив получен');
            console.log(resp);
            vm.object = resp;
          }, function (resp) {
            //cancelling
          })
      };

  }]);