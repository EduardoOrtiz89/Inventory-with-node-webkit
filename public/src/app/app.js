angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.rentas',
  'ngBoilerplate.ventas',
  'ngBoilerplate.login',
  'ngBoilerplate.sacos',
  'ngBoilerplate.ejemplo',
  'ui.router',
  'ngResource',
  'ngCookies'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/rentas' );
})

.run( function run ($cookies,$location, $rootScope) {
    if(!$cookies.access){
      $location.path('/login');
    }
  $rootScope.$on('$locationChangeStart', function (ev, next, curr) {
    if (!$cookies.access) {
      $location.path('/login');
    }
  });
})
  .factory('Window', function() {
      var gui = require('nw.gui');
      return gui.Window.get();
  })
.controller( 'AppCtrl', function AppCtrl ( $scope, $location,Window,$cookies ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Sistema de control de inventarios' ;
    }
    $scope.access=$cookies.access;
    $scope.windowMinimize = function() {
      Window.minimize();
    };

    $scope.windowToggleFullscreen = function() {
      Window.toggleFullscreen();
    };

    $scope.windowClose = function() {
      $cookies.access=null;
      Window.close();
    };


  });
})

;


