angular.module( 'ngBoilerplate.corbatas', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'corbatas', {
    url: '/corbatas',
    views: {
      "main": {
        controller: 'corbatasCtrl',
        templateUrl: 'prendas/corbatas/corbatas.tpl.html'
      }
    },
    data:{ pageTitle: 'corbatas' }
  });
})

.controller( 'corbatasCtrl', function corbatasController( $scope,$location,TableSearch,FormFactory,colores,tables ){
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
   FormFactory.init($scope,tables.corbatas);
  $scope.init();
  $scope.title="Corbatas";

})

;
