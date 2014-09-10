angular.module('ngBoilerplate.apartados', [
  'ui.router',
  'ngResource',
  'ui.select'
])


.config(function config($stateProvider) {
  $stateProvider.state('apartados', {
    url: '/apartados',
    views: {
      "main": {
        controller: 'apartadosCtrl',
        templateUrl: 'apartados/apartados.tpl.html'
      }
    },
    data: {
      pageTitle: 'apartados'
    }
  });
})

  .factory('apartados', function($resource) {
    return $resource('/apartados/:id', {
      id: '@id'
    }, {
      get: {
        method: 'GET',
        isArray: true
      },
      add: {
        method: 'POST'
      },
      remove: {
        method: 'DELETE'
      },
      update: {
        method: 'POST'
      },
      search: {
        method: 'GET',
        isArray: true
      }
    });
  }).
  filter('unique', function() {

    return function (arr, field) {
        var o = {}, i, l = arr.length, r = [];
        for(i=0; i<l;i+=1) {
          o[arr[i][field]] = arr[i];
        }
        for(i in o) {
          r.push(o[i]);
        }
        return r;
    };
    })
  .controller('apartadosCtrl', function apartadosController($scope, $filter,apartados,
    $location, tables,Prendas) {
    $scope.items = [];
    $scope.agregarArticulo=function(){
      $scope.items.push({});
    };
    $scope.codigos=[];
    $scope.colores=[];
    $scope.estilos=[];
    $scope.prendasCodigo = ["sacos", "pantalones", "chalecos"];
    $scope.prendasEstilo = ["sacos", "pantalones", "chalecos"];
    $scope.prendasColor=["sacos", "pantalones", "chalecos","camisas","togas","corbatas","gaznes","corbatines","monios","zapatos"];
    $scope.buscarPrenda=function(item,articulo,$index){
      tables[articulo.tipo.name].get(function(items){
        $scope.articulos[$index].codigo=null;
        $scope.articulos[$index].color=null;
        $scope.articulos[$index].estilo=null;
        $scope.codigos[$index]=[];
        $scope.estilos[$index]=[];
        $scope.colores[$index]=[];
        console.log(items);

        if($scope.prendasCodigo.indexOf(articulo.tipo.name)!==-1){
          $scope.codigos[$index]=items;
        }else{
          $scope.codigos[$index]=[];
        }
        if($scope.prendasEstilo.indexOf(articulo.tipo.name)!==-1){
          $scope.estilos[$index]=$filter('unique')(items,"estilo_desc");
        }else{
          $scope.estilos[$index]=[];
        }
        if($scope.prendasColor.indexOf(articulo.tipo.name)!==-1){
          $scope.colores[$index]=$filter('unique')(items,"color_desc");
        }else{
          $scope.colores[$index]=[];
        }

      });
    };
    $scope.articulos = [];

    $scope.prendas = Prendas;

  })

;
