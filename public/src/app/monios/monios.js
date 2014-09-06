angular.module( 'ngBoilerplate.monios', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'monios', {
    url: '/monios',
    views: {
      "main": {
        controller: 'moniosCtrl',
        templateUrl: 'corbatas/corbatas.tpl.html'
      }
    },
    data:{ pageTitle: 'Moños' }
  });
})
.controller( 'moniosCtrl', function moniosController( $scope,tables,$location,TableSearch,FormFactory,colores ){
 $scope.items=[];
        var sortingOrder = 'color';
        $scope.sortingOrder = sortingOrder;
        $scope.colores=colores.get(); 
        $scope.headers=[

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
   FormFactory.init($scope,tables.monios);
  $scope.init();
  $scope.title="Moños";

})

;
