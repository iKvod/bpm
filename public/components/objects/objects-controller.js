'use strict';

angular.module('bmp')
  .controller('ObjectsController',
    ['$state', '$stateParams', '$http','categories','$mdDialog',
    function ($state, $stateParams, $http, categories, $mdDialog) {
    var vm = this;

    vm.objects = categories.data;
    vm.categories = categories.data.categories;
    vm.templates = categories.data.object_templates;
    // console.log(categories);

      vm.data = [ "Item 1", "Item 2", "Item 3", "Item 4"];
      vm.toggle = {};


      // vm.panels = [
      //   {title:'Collapsible Group Item #1', body: 'Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch.'},
      //   {title:'Collapsible Group Item #2', body: 'Food truck fixie locavore, accusamus mcsweeney\'s marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee.'},
      //   {title:'Collapsible Group Item #3', body: 'Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney\'s organic lomo retro fanny pack lo-fi farm-to-table readymade.'}
      // ];
      // vm.panels.activePanel = 1;
      // vm.multiplePanels = {
      //   activePanels: [0,1]
      // };

      vm.template = {
        doc: [],
        task: [],
        link:[]
      };

      vm.pushPanel = function() {
        vm.panels.push({title: 'Collapsible Group Item #4', body: 'Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid.'});
      };


      var url  = 'http://185.97.115.34:65040';
      vm.setLink = function (ev) {
        $mdDialog.show({
          templateUrl: '/components/modals/objects/templ-tmpl.html',
          controller: 'TemplModalController',
          controllerAs: 'vm',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: true,
          locals:{
            // dpts: dpts,
            // positions: positions
          }
        })
          .then(function (resp) {
            // console.log('Ссылка получена');
            // console.log(resp);
            vm.template.link.push(resp);
          }, function (resp) {
            //cancelling
          })
      };


      
      vm.uploadFiles = function (files) {
        
      };

      vm.setFiles = function (file, errFile) {
        if(file){
          vm.template.doc.push(file);
          // console.log(file)
        }
        if(errFile){
          console.log(errFile);
        }
      };


      // tasks
      vm.panels = [
        {
          "title": "Collapsible Group Item #1",
          "body": "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch."
        },
        {
          "title": "Collapsible Group Item #2",
          "body": "Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee."
        },
        {
          "title": "Collapsible Group Item #3",
          "body": "Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade."
        }
      ];
      vm.panels.activePanel = 0;
      vm.panels.activePanel2 = 0;
      vm.panels.activePanel3 = 0;



      var level = {
        id: null,
        parentId: null,
        tasks: [],
        level:{}
      };

      // vm.levels = [{
      //   parentId: null,
      //   id: 0
      // }];

      // vm.task = {
      //   id: null,
      //   parentId: null,
      //   name: '',
      //   priorety: null,
      //   image: null,
      //   duration: null,
      //   people:[],
      //   equipments:[{
      //     number: null,
      //     name: ''
      //   }]
      // };
      vm.levels =
        [
          {
            id:1,
            name:'Работа  2 ур 2',
            parentId: 0
          } ,
          {
            parentId: 1,
            name:'ПодУр1',
            id: 2
          },
          {
            id: 3,
            parentId:2,
            name: 'Подуро2 ур 1'

          },
          {
            parentId: null,
            id: 0,
            name:'Главный уровень'
          }
        ];

      vm.tasks = [
        {
          name:'Работа 1 ур 2',
          parentId: 3
        },
        {
          parentId: 1,
          name:'Работа 2 уровня 1'
        },
        {
          parentId: 1,
          name:'Работа 2 уровня 1'
        },
        {
          name: 'Работа 1 ур  родитель',
          parentId: 0
        },{
          name: 'Работа 2 ур  родитель',
          parentId: 0
        }
      ];


      vm.panels.activePanel4 = 0;

      vm.setLevel = function (parentId) {
        console.log(parentId)

      };

      vm.crateteTask = function () {

      };
      // vm.level = {
      //   level: {
      //     level: [],
      //     tasks:[{
      //       name: '',
      //       priorety: null,
      //       image: null,
      //       duration: null,
      //       people:[],
      //       equipments:[{
      //         number: null,
      //         name: ''
      //       }]
      //     }],
      //     parentId: 0,
      //     id: 1
      //   },
      //   tasks : [{
      //     name: '',
      //     priorety: null,
      //     image: null,
      //     duration: null,
      //     people:[],
      //     equipments:[{
      //       number: null,
      //       name: ''
      //     }]
      //   }],
      //   parentId: null,
      //   id: 0
      // }














    }]);