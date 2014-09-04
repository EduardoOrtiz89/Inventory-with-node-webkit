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
  .factory('monios', function($resource) {
    return $resource('/monios/:id',{id: '@id'},
        {
         get: {method: 'GET', isArray: true },
         add: {method: 'POST'},
         remove: {method: 'DELETE'},
         update: {method: 'POST'},
         search: {method: 'GET', isArray: true}
        }
    );
  })
.controller( 'moniosCtrl', function moniosController( $scope,monios,$location,TableSearch,FormFactory ){
 $scope.items=[];
        var sortingOrder = 'color';
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
   FormFactory.init($scope,monios);
  $scope.init();
  $scope.title="Moños";

})

;

