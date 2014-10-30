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
        templateUrl: 'prendas/sacos/sacos.tpl.html'
      }
    },
    data:{ pageTitle: 'chalecos' }
  });
})

.controller( 'chalecosCtrl', function chalecosController( $scope,tables,$location,TableSearch,FormFactory,colores,estilos ){
        $scope.items=[];
        var sortingOrder = 'codigo';
        $scope.colores=colores.get();
        $scope.estilos=estilos.get();
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
   FormFactory.init($scope,tables.chalecos);
  $scope.init();
  $scope.title="Chalecos";

})

;
