angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.rentas',
  'ngBoilerplate.ventas',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/rentas' );
})

.run( function run () {
})
  .factory('Window', function() {
      var gui = require('nw.gui');
      return gui.Window.get();
  })
.controller( 'AppCtrl', function AppCtrl ( $scope, $location,Window ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ngBoilerplate' ;
    }

    $scope.windowMinimize = function() {
      Window.minimize();
    };

    $scope.windowToggleFullscreen = function() {
      Window.toggleFullscreen();
    };

    $scope.windowClose = function() {
      Window.close();
    };


  });
})

;

