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
  .factory('Sacos', function($resource) {
    return $resource('/sacos/:id',{id: '@id'},
        {
         get: {method: 'GET', isArray: true },
         add: {method: 'POST'},
         remove: {method: 'DELETE'},
         update: {method: 'POST'}
        }
    );
  })
.controller( 'sacosCtrl', function sacosController( $scope,Sacos,$location,TableSearch ){
 $scope.items=[];
/*table ordered*/
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
    var init=function(){
      Sacos.get(function(data){
        $scope.items=data;
        $scope.search();
      });
    };
  init();
  $scope.guardar=function(){
      Sacos.add($scope.prenda,function(item){
         init();
         $scope.prenda={};
      });
  };
  $scope.cancelar=function(){
      $scope.prenda={};
  };
  $scope.remove=function(item){
    if(confirm("¿Seguro que desea eliminar este elmento?")){
      Sacos.remove({id:item._id},function(){
         $scope.items.splice($scope.items.indexOf(item), 1);
         $scope.search();
      });
    }
  };
  $scope.edit=function(item){
    $scope.prenda=angular.copy(item);
  };
  $scope.title="Sacos";

})

;

