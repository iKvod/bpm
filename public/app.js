/**
 * Created by rafa on 11/04/2017.
 */
'use strict';
angular.module('bmp', [
  'ngMaterial',
  'ngAnimate',
  'ui.router',
  'ngResource',
  'ngFileUpload',
  'ngAria',
  'ngMessages',
  'material.svgAssetsCache',
  'ngSanitize',
  'mgcrea.ngStrap',
  'ngStorage'
])

  .config(['$stateProvider', '$urlRouterProvider','$locationProvider','$mdThemingProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
      $mdThemingProvider.theme('red')
        .primaryPalette('red');

      var url  = 'http://185.97.115.34:65040';

      $mdThemingProvider.theme('blue')
        .primaryPalette('blue');

      $stateProvider
        .state('root', {
          url: '/',
          views: {
            'menu': {


            },
            'content': {
              template: "<h1> Main Page of user </h1>",

              // templateUrl: 'components/auth/',
              controller: 'AuthController',
              controllerAs: 'vm',
            }
          }
        })
        .state('main', {
          url: '/main',
          templateUrl: 'components/main/main.html',
          controller: 'MainController',
          controllerAs: 'vm'/*,
           resolve: {
           user : function(ChecklistService){
           var userData = ChecklistService.query();
           return userData.$promise;
           }
           }*/
        })
        .state('auth', {
          url: '/auth',
          views: {
            'content':{
              templateUrl: 'components/auth/login.html',
              controller: 'AuthController',
              controllerAs: 'vm',
            }
          }
        })
        .state('objects', {
          url: '/objects',
          views: {
            'menu': {
              templateUrl: 'components/menu/menu.html',
              controller: 'MenuController',
              controllerAs: 'vm',
            },
            'content': {
              templateUrl: 'components/objects/objects-page.html',
              controller: 'ObjectsController',
              controllerAs: 'vm',
            }

          },
          resolve : {
            categories: function ($http) {
              return $http({
                url: url + '/api/object_templates/list_all',
                method: 'GET'
              })
                .then(function (resp) {
                  // console.log(resp);
                  return resp;
                }, function (err) {
                  console.log(err);
                })
            }
          }
        })
        .state('projects', {
          url: '/projects',
          views: {
            'menu': {
              templateUrl: 'components/menu/menu.html',
              controller: 'MenuController',
              controllerAs: 'vm',
            },
            'content': {
              templateUrl: 'components/projects/projects-page.html',
              controller: 'ProjectsController',
              controllerAs: 'vm',
            }
          }
        })
        .state('projects.new', {
          url: '/new/:projectId',
          views: {
            'menu':{
              templateUrl: 'components/menu/menu.html',
              controller: 'MenuController',
              controllerAs: 'vm',
            },
            'content': {
              templateUrl: 'components/projects/projects-new-page.html',
              controller: 'ProjectsController',
              controllerAs: 'vm',
            }
          }
        });
      // $stateProvider
      //   .state('root', {
      //     url: '/',
      //     // templateUrl: 'components/auth/login.html',
      //     // controller: 'AuthController',
      //     // controllerAs: 'vm',
      //   })
      //   .state('main', {
      //   url: '/main',
      //   // template: '<h1>Hello From template</h1>',
      //   templateUrl: 'components/main/main.html',
      //   controller: 'MainController',
      //   controllerAs: 'vm'/*,
      //    resolve: {
      //    user : function(ChecklistService){
      //    var userData = ChecklistService.query();
      //    return userData.$promise;
      //    }
      //    }*/
      // })
      //   .state('auth', {
      //     url: '/auth',
      //     templateUrl: 'components/auth/login.html',
      //     controller: 'AuthController',
      //     controllerAs: 'vm',
      //   })
      //   .state('objects', {
      //     url: '/objects',
      //     templateUrl: 'components/objects/objects-page.html',
      //     controller: 'ObjectsController',
      //     controllerAs: 'vm',
      //   })
      //   .state('projects', {
      //     url: '/projects',
      //     templateUrl: 'components/projects/projects-page.html',
      //     controller: 'ProjectsController',
      //     controllerAs: 'vm',
      //   })
      //   .state('projects.new', {
      //     url: '/projects/:project_id',
      //     templateUrl: 'components/projects/projects-new-page.html',
      //     controller: 'ProjectsController',
      //     controllerAs: 'vm',
      //   });

      $urlRouterProvider.otherwise("/");
      $locationProvider.html5Mode(true);

    }])
  .run(function($rootScope, $http, $location, $localStorage) {
  // keep user logged in after page refresh
      if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
      }

      // redirect to login page if not logged in and trying to access a restricted page
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
          $location.path('/auth');
        }
      });
    }
  );




