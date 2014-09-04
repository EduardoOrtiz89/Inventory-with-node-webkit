angular.module( 'ngBoilerplate.moños', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'moños', {
    url: '/moños',
    views: {
      "main": {
        controller: 'moñosCtrl',
        templateUrl: 'moños/moños.tpl.html'
      }
    },
    data:{ pageTitle: 'moños' }
  });
})
  .factory('moños', function($resource) {
    return $resource('/moños/:id',{id: '@id'},
        {
         get: {method: 'GET', isArray: true },
         add: {method: 'POST'},
         remove: {method: 'DELETE'},
         update: {method: 'POST'},
         search: {method: 'GET', isArray: true}
        }
    );
  })
.controller( 'moñosCtrl', function moñosController( $scope,moños,$location,TableSearch,FormFactory ){
 $scope.items=[];
        var sortingOrder = 'codigo';
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
   FormFactory.init($scope,moños);
  $scope.init();
  $scope.title="moños";

})

;

