angular.module( 'ngBoilerplate.gaznes', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'gaznes', {
    url: '/gaznes',
    views: {
      "main": {
        controller: 'gaznesCtrl',
        templateUrl: 'prendas/corbatas/corbatas.tpl.html'
      }
    },
    data:{ pageTitle: 'gaznes' }
  });
})
.controller( 'gaznesCtrl', function gaznesController( $scope,$location,TableSearch,FormFactory,colores,tables  ){
 $scope.items=[];
        var sortingOrder = 'color';
        $scope.colores=colores.get();
        $scope.sortingOrder = sortingOrder;
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
   FormFactory.init($scope,tables.gaznes);
  $scope.init();
  $scope.title="Gaznes";

})

;
