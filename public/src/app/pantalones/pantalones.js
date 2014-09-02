angular.module( 'ngBoilerplate.pantalones', [
  'ui.router',
  'ngResource'
])



.config(function config( $stateProvider ) {
  $stateProvider.state( 'pantalones', {
    url: '/pantalones',
    views: {
      "main": {
        controller: 'pantalonesCtrl',
        templateUrl: 'pantalones/pantalones.tpl.html'
      }
    },
    data:{ pageTitle: 'Pantalones' }
  });
})

.factory('Pantalones', function($resource) {
     return $resource('/pantalones/:id',{id: '@id'},
        {
        get: {method: 'GET', isArray: true },
         add: {method: 'POST'},
         remove: {method: 'DELETE'},
         update: {method: 'POST'}
        }
    );
  })


.controller( 'pantalonesCtrl', function ( $scope,Pantalones,$location,TableSearch) {
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
      Pantalones.get(function(data){
        $scope.items=data;
        $scope.search();
      });
    };
  init();
  $scope.guardar=function(){
      Pantalones.add($scope.prenda,function(item){
         init();
         $scope.prenda={};
      });
  };
  $scope.cancelar=function(){
      $scope.prenda={};
  };
  $scope.remove=function(item){
    if(confirm("¿Seguro que desea eliminar este elmento?")){
      Pantalones.remove({id:item._id},function(){
         $scope.items.splice($scope.items.indexOf(item), 1);
         $scope.search();
      });
    }
  };
  $scope.edit=function(item){
    $scope.prenda=angular.copy(item);
  };
  $scope.title="Pantalones";




})

;

