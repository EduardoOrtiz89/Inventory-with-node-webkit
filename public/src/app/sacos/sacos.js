angular.module( 'ngBoilerplate.sacos', [
  'ui.router',
  'ngResource'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'sacos', {
    url: '/sacos',
    views: {
      "main": {
        controller: 'sacosCtrl',
        templateUrl: 'sacos/sacos.tpl.html'
      }
    },
    data:{ pageTitle: 'Sacos' }
  });
})
.controller( 'sacosCtrl', function sacosController( $scope,$location,TableSearch,FormFactory,tables,colores,estilos){
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
   FormFactory.init($scope,tables.sacos);
  $scope.init();
  $scope.title="Sacos";

})

;
