angular.module( 'ngBoilerplate.ventas', [
  'ui.router',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'ventas', {
    url: '/ventas',
    views: {
      "main": {
        controller: 'VentasCtrl',
        templateUrl: 'ventas/ventas.tpl.html'
      }
    },
    data:{ pageTitle: 'Ventas' }
  });
})

.controller( 'VentasCtrl', function VentasCtrl( $scope ) {
  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
