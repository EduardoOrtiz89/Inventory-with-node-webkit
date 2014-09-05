angular.module( 'ngBoilerplate.colores', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'colores', {
    url: '/colores',
    views: {
      "main": {
        controller: 'coloresCtrl',
        templateUrl: 'colores/colores.tpl.html'
      }
    },
    data:{ pageTitle: 'colores' }
  });
})
  .factory('colores', function($resource) {
    return $resource('/colores/:id',{id: '@id'},
        {
         get: {method: 'GET', isArray: true },
         add: {method: 'POST'},
         remove: {method: 'DELETE'},
         update: {method: 'POST'},
         search: {method: 'GET', isArray: true}
        }
    );
  })
.controller( 'coloresCtrl', function coloresController( $scope,colores,$location,TableSearch,FormFactory ){
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
   FormFactory.init($scope,colores);
  $scope.init();
  $scope.title="Colores";

})

;

