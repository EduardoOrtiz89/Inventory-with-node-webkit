angular.module( 'ngBoilerplate.chalecos', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'chalecos', {
    url: '/chalecos',
    views: {
      "main": {
        controller: 'chalecosCtrl',
        templateUrl: 'sacos/sacos.tpl.html'
      }
    },
    data:{ pageTitle: 'chalecos' }
  });
})
  .factory('chalecos', function($resource) {
    return $resource('/chalecos/:id',{id: '@id'},
        {
         get: {method: 'GET', isArray: true },
         add: {method: 'POST'},
         remove: {method: 'DELETE'},
         update: {method: 'POST'},
         search: {method: 'GET', isArray: true}
        }
    );
  })
.controller( 'chalecosCtrl', function chalecosController( $scope,chalecos,$location,TableSearch,FormFactory ){
        $scope.items=[];
        var sortingOrder = 'codigo';
        $scope.sortingOrder = sortingOrder;
        $scope.headers=[
            {
                "class": "fa fa-sort",
                "text": "Código",
                "sort_by":"codigo"
            },
               {
                "class": "fa fa-sort",
                "text": "Estilo",
                "sort_by":"estilo"
            },
               {
                "class": "fa fa-sort",
                "text": "Talla",
                "sort_by":"talla"
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
   FormFactory.init($scope,chalecos);
  $scope.init();
  $scope.title="Chalecos";

})

;

