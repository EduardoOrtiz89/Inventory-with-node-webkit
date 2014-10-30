angular.module( 'ngBoilerplate.pantalones', [
  'ui.router',
  'ngResource'
])



.config(function config( $stateProvider ) {
  $stateProvider.state( 'pantalones', {
    url: '/pantalones',
    views: {
      "main": {
        controller: 'pantalonesCtrl',
        templateUrl: 'prendas/sacos/sacos.tpl.html'
      }
    },
    data:{ pageTitle: 'Pantalones' }
  });
})
.controller( 'pantalonesCtrl', function ( $scope,tables,$location,FormFactory,TableSearch,colores,estilos) {
 $scope.items=[];
/*table ordered*/
        var sortingOrder = 'codigo';
        $scope.colores=colores.get();
        $scope.estilos=estilos.get();
        $scope.sortingOrder = sortingOrder;
        $scope.headers=[
            {
                "class": "fa fa-sort",
                "text": "Código",
                "sort_by":"codigo"
            },
               {
                "class": "fa fa-sort",
                "text": "Estilo",
                "sort_by":"estilo"
            },
               {
                "class": "fa fa-sort",
                "text": "Talla",
                "sort_by":"talla"
            },
             {
                "class": "fa fa-sort",
                "text": "Nuevos",
                "sort_by":"nuevos"
            },
             {
                "class": "fa fa-sort",
                "text": "Usados",
                "sort_by":"usados"
            }
        ];
   TableSearch.search($scope);
   FormFactory.init($scope,tables.pantalones);
  $scope.init();
  $scope.title="Pantalones";




})

;
