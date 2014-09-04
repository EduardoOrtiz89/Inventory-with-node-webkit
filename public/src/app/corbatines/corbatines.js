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
        templateUrl: 'corbatas/corbatas.tpl.html'
      }
    },
    data:{ pageTitle: 'corbatines' }
  });
})
  .factory('corbatines', function($resource) {
    return $resource('/corbatines/:id',{id: '@id'},
        {
         get: {method: 'GET', isArray: true },
         add: {method: 'POST'},
         remove: {method: 'DELETE'},
         update: {method: 'POST'},
         search: {method: 'GET', isArray: true}
        }
    );
  })
.controller( 'corbatinesCtrl', function corbatinesController( $scope,corbatines,$location,TableSearch,FormFactory ){
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
   FormFactory.init($scope,corbatines);
  $scope.init();
  $scope.title="Corbatines";

})

;

