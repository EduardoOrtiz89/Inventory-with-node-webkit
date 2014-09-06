angular.module( 'ngBoilerplate.zapatos', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'zapatos', {
    url: '/zapatos',
    views: {
      "main": {
        controller: 'zapatosCtrl',
        templateUrl: 'zapatos/zapatos.tpl.html'
      }
    },
    data:{ pageTitle: 'zapatos' }
  });
})
.controller( 'zapatosCtrl', function zapatosController( $scope,tables,$location,TableSearch,FormFactory ){
 $scope.items=[];
        var sortingOrder = 'talla';
        $scope.sortingOrder = sortingOrder;
        $scope.headers=[
               {
                "class": "fa fa-sort",
                "text": "Talla",
                "sort_by":"talla"
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
   FormFactory.init($scope,tables.zapatos);
  $scope.init();
  $scope.title="Zapatos";

})

;
