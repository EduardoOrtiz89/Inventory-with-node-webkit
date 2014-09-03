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
  .factory('camisas', function($resource) {
    return $resource('/camisas/:id',{id: '@id'},
        {
         get: {method: 'GET', isArray: true },
         add: {method: 'POST'},
         remove: {method: 'DELETE'},
         update: {method: 'POST'},
         search: {method: 'GET', isArray: true}
        }
    );
  })
.controller( 'camisasCtrl', function camisasController( $scope,camisas,$location,TableSearch,FormFactory ){
 $scope.items=[];
        var sortingOrder = 'codigo';
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
  FormFactory.init($scope,camisas);
  $scope.init();
  $scope.title="Camisas";

})

;

