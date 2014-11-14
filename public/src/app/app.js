angular.module('ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.rentas',
  'ngBoilerplate.ventas',
  'ngBoilerplate.login',
  'ngBoilerplate.sacos',
  'ngBoilerplate.camisas',
  'ngBoilerplate.chalecos',
  'ngBoilerplate.togas',
  'ngBoilerplate.pantalones',
  'ngBoilerplate.monios',
  'ngBoilerplate.corbatas',
  'ngBoilerplate.corbatines',
  'ngBoilerplate.gaznes',
  'ngBoilerplate.zapatos',
  'ngBoilerplate.apartados',
  'ngBoilerplate.estilos',
  'ngBoilerplate.colores',
  'ngBoilerplate.usuarios',
  'ngBoilerplate.reportes_rentas',
  'ngBoilerplate.reporte_disponibilidad',
  'ngBoilerplate.administrar_tickets',
  'ngBoilerplate.tickets_ventas',
  'ngBoilerplate.reportes_ventas',
  'util.resources',
  'util.forms',
  'ui.router',
  'ngSanitize',
  'ui.select',
  'ui.bootstrap',
  'ngResource',
  'dialogs',
  'ui.calendar',
  'ngCookies'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider, uiSelectConfig) {
  uiSelectConfig.theme = 'bootstrap';
  $urlRouterProvider.otherwise('/apartados');
})

.run(function run($cookies, $location, $rootScope) {
  //$cookies.access = 1;
  if (!$cookies.access) {
    $location.path('/login');
  }
  $rootScope.$on('$locationChangeStart', function(ev, next, curr) {
    if (!$cookies.access) {
      $location.path('/login');
    }
  });
})
  .factory('Window', function() {
    var gui = require('nw.gui');
    return gui.Window.get();
  })
  .controller('AppCtrl', ['$scope', '$locale', '$location', 'Window', '$cookies', '$filter',  function AppCtrl($scope, $locale, $location, Window, $cookies, $filter) {

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle;
      }
      $scope.access = $cookies.access;
      $scope.windowMinimize = function() {
        Window.minimize();
      };

      $scope.windowToggleFullscreen = function() {
        Window.toggleFullscreen();
      };
      $scope.tipo_usuario=$cookies.access;
      $scope.windowClose = function() {
        $cookies.access = null;
        Window.close();
      };
    });
  }]);