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
  })
    .controller('modalController',function($scope,$filter,$modalInstance,tables,FormFactory,TableSearch,prenda){


        var sortingOrder = 'codigo';
        $scope.sortingOrder = sortingOrder;
        $scope.headers=[
            {
                "class": "fa fa-sort",
                "text": "codigo",
                "sort_by":"codigo"
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
        tables[prenda.name].get(function(data){
           $scope.items=data;
           $scope.search();
         });
          TableSearch.search($scope);
          $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
          };

          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
    })
  .controller('apartadosCtrl', function apartadosController($scope, $log,$filter, $modal,apartados,
    $location, tables,Prendas) {
    $scope.agregarArticulo=function(){
      if(!$scope.articulo.tipoPrenda){ return;}
       var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'modalController',
      size: "lg",
      resolve: {
        prenda: function () {
          return $scope.articulo.tipoPrenda;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      console.log(selectedItem);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });

      //$scope.popup
      //$scope.items.push({});
    };
    $scope.codigos=[];
    $scope.colores=[];
    $scope.estilos=[];
    $scope.prendasCodigo = ["sacos", "pantalones", "chalecos"];
    $scope.prendasEstilo = ["sacos", "pantalones", "chalecos"];
    $scope.prendasColor=["sacos", "pantalones", "chalecos","camisas","togas","corbatas","gaznes","corbatines","monios","zapatos"];

    $scope.articulo = {};

    $scope.prendas = Prendas;

  })

;
