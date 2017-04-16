/**
 * Created by rafa on 16/04/2017.
 */
'use strict';

angular.module('bmp')
  .factory('ModalService', ['$resource', function ($resource, $http) {

    var url  = 'http://185.97.115.34:65040';
    // var url  = 'http://185.97.115.34:65040';


    var modalsServices = {};


    modalsServices.getObjects = function () {
      console.log(url);
      return $http({
        url: url + '/api/object_templates/list_all',
        method: "GET"
      })
        .then(function (resp) {
          return resp;
        }, function (err) {
          console.log(err);

        })
    };


 return modalsServices;

    // return $resource('/api/depts/:id', { id: '@id'}, {
    //   create: { method: 'POST' },
    //   getAll: { method: 'GET', isArray: true },
    //   getOne: {
    //     method: 'GET',
    //     params: {'id': '@id'}
    //   },
    //   update: {
    //     method: 'PUT',
    //     params: { "id":"@id" },
    //     isArray: false,
    //     cache: false
    //   },
    //   deleteAll: {method: 'DELETE'},
    //   deleteOne: {
    //     method: 'DELETE',
    //     params: {'id': '@id'}
    //   }
    // });
  }]);