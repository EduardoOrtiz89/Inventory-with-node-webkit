angular.module( 'ngBoilerplate.ejemplo', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'ejemplo', {
    url: '/ejemplo',
    views: {
      "main": {
        controller: 'EjemploCtrl',
        templateUrl: 'ejemplo/ejemplo.tpl.html'
      }
    },
    data:{ pageTitle: 'Ejemplo' }
  });
})

.controller( 'EjemploCtrl', function EjemploCtrl( $scope ) {
  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
