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
        templateUrl: 'corbatas/corbatas.tpl.html'
      }
    },
    data:{ pageTitle: 'gaznes' }
  });
})
  .factory('gaznes', function($resource) {
    return $resource('/gaznes/:id',{id: '@id'},
        {
         get: {method: 'GET', isArray: true },
         add: {method: 'POST'},
         remove: {method: 'DELETE'},
         update: {method: 'POST'},
         search: {method: 'GET', isArray: true}
        }
    );
  })
.controller( 'gaznesCtrl', function gaznesController( $scope,gaznes,$location,TableSearch,FormFactory ){
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
   FormFactory.init($scope,gaznes);
  $scope.init();
  $scope.title="Gaznes";

})

;

