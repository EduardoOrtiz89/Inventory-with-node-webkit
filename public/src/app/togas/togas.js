angular.module( 'ngBoilerplate.togas', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'togas', {
    url: '/togas',
    views: {
      "main": {
        controller: 'togasCtrl',
        templateUrl: 'togas/togas.tpl.html'
      }
    },
    data:{ pageTitle: 'togas' }
  });
})

.controller( 'togasCtrl', function togasController( $scope,tables,$location,TableSearch,FormFactory,colores ){
 $scope.items=[];
        var sortingOrder = 'talla';
        $scope.colores=colores.get();
        $scope.sortingOrder = sortingOrder;
        $scope.headers=[
               {
                "class": "fa fa-sort",
                "text": "Talla",
                "sort_by":"talla"
            },
                {
                "class": "fa fa-sort",
                "text": "Color",
                "sort_by":"color"
            },
             {
                "class": "fa fa-sort",
                "text": "Cantidad",
                "sort_by":"cantidad"
            },
             {
                "class": "fa fa-sort",
                "text": "Costo",
                "sort_by":"costo_renta"
            }
        ];
   TableSearch.search($scope);
   FormFactory.init($scope,tables.togas);
  $scope.init();
  $scope.title="Togas";

})

;
