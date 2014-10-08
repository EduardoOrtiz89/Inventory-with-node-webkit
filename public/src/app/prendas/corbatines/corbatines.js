angular.module( 'ngBoilerplate.corbatines', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'corbatines', {
    url: '/corbatines',
    views: {
      "main": {
        controller: 'corbatinesCtrl',
        templateUrl: 'prendas/corbatas/corbatas.tpl.html'
      }
    },
    data:{ pageTitle: 'corbatines' }
  });
})

.controller( 'corbatinesCtrl', function corbatinesController( $scope,$location,TableSearch,FormFactory,colores,tables ){
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
   FormFactory.init($scope,tables.corbatines);
  $scope.init();
  $scope.title="Corbatines";

})

;
