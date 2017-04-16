/**
 * Created by rafa on 16/04/2017.
 */
'use strict';

angular.module('bmp')
  .factory('AuthenticationService', ['$resource', '$http','$localStorage',
    function ($resource, $http, $localStorage) {

    var service = {};
    var url  = 'http://185.97.115.34:65040';

    service.Login = Login;
    service.Logout = Logout;

    return service;

    function Login(username, password, callback) {
      $http.post(url + '/api/login', { username: username, password: password })
        .then(function (response) {
          console.log(response);
          if (response.data.auth_token) {
            // console.log(response.data.auth_token);
            $localStorage.currentUser = { username: username, token: response.data.auth_token };

            $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.auth_token;
            callback(true);
          } else {
            callback(false);
          }
        }, function (err) {
          console.log(err);

        });
    }

    function Logout() {
      delete $localStorage.currentUser;
      $http.defaults.headers.common.Authorization = '';
    }




  }]);