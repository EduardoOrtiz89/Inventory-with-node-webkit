angular.module( 'ngBoilerplate.camisas', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'camisas', {
    url: '/camisas',
    views: {
      "main": {
        controller: 'camisasCtrl',
        templateUrl: 'camisas/camisas.tpl.html'
      }
    },
    data:{ pageTitle: 'camisas' }
  });
})
.controller( 'camisasCtrl', function camisasController( $scope,$location,TableSearch,FormFactory,colores,tables ){
 $scope.items=[];
        var sortingOrder = 'codigo';
        $scope.colores=colores.get();
        $scope.sortingOrder = sortingOrder;
        $scope.headers=[
            {
                "class": "fa fa-sort",
                "text": "Cuello",
                "sort_by":"cuello"
            },
                {
                "class": "fa fa-sort",
                "text": "Color",
                "sort_by":"color"
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
  FormFactory.init($scope,tables.camisas);
  $scope.init();
  $scope.title="Camisas";

})

;
