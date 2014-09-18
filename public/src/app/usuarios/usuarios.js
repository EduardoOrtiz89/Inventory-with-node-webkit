angular.module( 'ngBoilerplate.usuarios', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'usuarios', {
    url: '/usuarios',
    views: {
      "main": {
        controller: 'usuariosCtrl',
        templateUrl: 'usuarios/usuarios.tpl.html'
      }
    },
    data:{ pageTitle: 'usuarios' }
  });
})

.controller( 'usuariosCtrl', function usuariosController( $scope,usuarios,$location,TableSearch,FormFactory ){
 $scope.items=[];
        var sortingOrder = 'talla';
        $scope.sortingOrder = sortingOrder;
        $scope.headers=[

                {
                "class": "fa fa-sort",
                "text": "Color",
                "sort_by":"color"
            }

        ];
   TableSearch.search($scope);
   FormFactory.init($scope,usuarios);
  $scope.init();
  $scope.title="Usuarios";

})

;
