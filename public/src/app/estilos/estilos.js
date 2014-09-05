angular.module( 'ngBoilerplate.estilos', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'estilos', {
    url: '/estilos',
    views: {
      "main": {
        controller: 'estilosCtrl',
        templateUrl: 'estilos/estilos.tpl.html'
      }
    },
    data:{ pageTitle: 'estilos' }
  });
})
  .factory('estilos', function($resource) {
    return $resource('/estilos/:id',{id: '@id'},
        {
         get: {method: 'GET', isArray: true },
         add: {method: 'POST'},
         remove: {method: 'DELETE'},
         update: {method: 'POST'},
         search: {method: 'GET', isArray: true}
        }
    );
  })
.controller( 'estilosCtrl', function estilosController( $scope,estilos,$location,TableSearch,FormFactory ){
 $scope.items=[];
        var sortingOrder = 'talla';
        $scope.sortingOrder = sortingOrder;
        $scope.headers=[
        
             {
                "class": "fa fa-sort",
                "text": "Estilo",
                "sort_by":"estilo"
            }
        ];
   TableSearch.search($scope);
   FormFactory.init($scope,estilos);
  $scope.init();
  $scope.title="Estilos";

})

;

