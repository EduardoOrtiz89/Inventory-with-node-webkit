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
        templateUrl: 'corbatas/corbatas.tpl.html'
      }
    },
    data:{ pageTitle: 'corbatas' }
  });
})
  .factory('corbatas', function($resource) {
    return $resource('/corbatas/:id',{id: '@id'},
        {
         get: {method: 'GET', isArray: true },
         add: {method: 'POST'},
         remove: {method: 'DELETE'},
         update: {method: 'POST'},
         search: {method: 'GET', isArray: true}
        }
    );
  })
.controller( 'corbatasCtrl', function corbatasController( $scope,corbatas,$location,TableSearch,FormFactory ){
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
   FormFactory.init($scope,corbatas);
  $scope.init();
  $scope.title="Corbatas";

})

;

