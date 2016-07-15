const app = angular.module('user-auth', ['ui.bootstrap', 'ui.router', 'xeditable', 'ngCookies']);

function module($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: '/html/home.html',
  })
  .state('user', {
    url: '/user',
    templateUrl: 'html/user.html',
    controller: 'userController',
    resolve: {
      authorize: authService =>
      authService.authorize(),
    },
  })
  .state('thing', {
    url: '/thing',
    templateUrl: 'html/thing.html',
    controller: 'thingController',
    resolve: {
      authorize: authService =>
      authService.authorize(),
    },
  })
  .state('login', {
    url: '/login',
    templateUrl: '/html/loginregister.html',
    controller: 'loginRegisterController',
  })
  .state('register', {
    url: '/register',
    templateUrl: '/html/loginregister.html',
    controller: 'loginRegisterController',
  });

  $urlRouterProvider.otherwise('/home');
}

app.constant('TOKENNAME', 'authtoken');
app.config(module);
