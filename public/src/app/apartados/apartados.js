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
    .controller('modalController',function($scope,$filter,$modalInstance,tables,FormFactory,TableSearch,prenda,articulos){


        var sortingOrder = 'codigo';
        $scope.sortingOrder = sortingOrder;
        var prendasCodigo = ["sacos", "pantalones", "chalecos"];
        var prendasEstilo = ["sacos", "pantalones", "chalecos"];
        var prendasColor=["sacos", "pantalones", "chalecos","camisas","togas","corbatas","gaznes","corbatines","monios","zapatos"];
        var prendasCuello=["camisas"];
        var prendasTalla=["sacos", "pantalones", "chalecos","camisas","togas","zapatos"];
        var prendasCantidad=["togas","corbatas","corbatines","gaznes","monios","zapatos"];
        $scope.headers=[];
        $scope.columns=[];
        var getDescription=function(item){
            var desc=prenda.description;

                if(prendasCodigo.indexOf(prenda.name)!==-1){
                  desc+=" "+item.codigo;
                }
                if(prendasEstilo.indexOf(prenda.name)!==-1){
                  desc+=" estilo "+item.estilo_desc;
                }
                if(prendasColor.indexOf(prenda.name)!==-1){
                  desc+=" color "+item.color_desc;
                }
                if(prendasCuello.indexOf(prenda.name)!==-1){
                  desc+=" cuello "+item.cuello;
                }
                if(prendasTalla.indexOf(prenda.name)!==-1){
                  desc+=" talla "+item.talla;
                }
                return desc;
        };
        if(prendasCodigo.indexOf(prenda.name)!==-1){
          $scope.headers.push({
              "class": "fa fa-sort",
              "text": "codigo",
              "sort_by":"codigo"
            });
            $scope.columns.push("codigo");
        }
        if(prendasEstilo.indexOf(prenda.name)!==-1){
          $scope.headers.push({
            "class": "fa fa-sort",
            "text": "Estilo",
            "sort_by":"estilo"
        });
            $scope.columns.push("estilo_desc");
        }
        if(prendasColor.indexOf(prenda.name)!==-1){
          $scope.headers.push({
            "class": "fa fa-sort",
            "text": "Color",
            "sort_by":"color"
        });
            $scope.columns.push("color_desc");
        }
        if(prendasCuello.indexOf(prenda.name)!==-1){
          $scope.headers.push({
          "class": "fa fa-sort",
          "text": "Cuello",
          "sort_by":"cuello"
      });
            $scope.columns.push("cuello");
        }
        if(prendasTalla.indexOf(prenda.name)!==-1){
          $scope.headers.push({
            "class": "fa fa-sort",
            "text": "Talla",
            "sort_by":"talla"
        });
            $scope.columns.push("talla");
        }

  if(prendasCantidad.indexOf(prenda.name)===-1){
          $scope.headers.push(

             {
                "class": "fa fa-sort",
                "text": "Nuevos",
                "sort_by":"nuevos"
            });
            $scope.headers.push(
             {
                "class": "fa fa-sort",
                "text": "Usados",
                "sort_by":"usados"
            });
            $scope.columns.push("nuevos");
            $scope.columns.push("usados");
          }else{
              $scope.headers.push(
               {
                  "class": "fa fa-sort",
                  "text": "Cantidad",
                  "sort_by":"cantidad"
              });
              $scope.columns.push("cantidad");
          }
            $scope.headers.push(
            {
               "class": "fa fa-sort",
               "text": "Disponibles",
               "sort_by":"disponibles"
           });
        $scope.cantidad=1;

        $scope.columns.push("disponibles");
        tables[prenda.name].get(function(data){
           $scope.items=data;
           $scope.search();
           articulos.forEach(function(art){
              if(prenda.name===art.prenda){
                 data.forEach(function(item){
                   if(item.id===art.id){
                      item.disponibles=item.disponibles-art.cantidadElegida;
                   }
                 });
              }
           });
         });
          TableSearch.search($scope);
          $scope.add=function(item){
            var cantidad=parseInt($scope.cantidad,10);
            if(cantidad<=0 || typeof cantidad !== 'number' || isNaN(cantidad) || !isFinite(cantidad)){
               $scope.message_error="Cantidad inválida";
               return;
            }
            if(cantidad>item.disponibles){
              $scope.message_error="Cantidad de artículos no disponibles";
              return;
            }
            item.cantidadElegida=$scope.cantidad;
            item.tipoPrenda=prenda.description;
            item.prenda=prenda.name;
            item.completeDescription=getDescription(item);
            item.subtotal=parseFloat($scope.cantidad)* parseFloat(item.costo_renta);
            item.descuento=0;
            item.sub_desc=item.subtotal;
            $modalInstance.close(item);
          };


          $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
          };
    })
  .controller('apartadosCtrl', function apartadosController($scope, $log,$filter, $modal,apartados,
    $location, tables,Prendas) {
      $scope.articulos=[];
    $scope.agregarArticulo=function(){
        if(!$scope.articulo.tipoPrenda){ return;}
         var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'modalController',
        size: "lg",
        resolve: {
          prenda: function () {
            return $scope.articulo.tipoPrenda;
          },
          articulos: function(){
            return $scope.articulos;
          }

        }
      });

      modalInstance.result.then(function (selectedItem) {

        $scope.articulos.push(selectedItem);
      }, function () {
        //dismiss
      });
    };

    $scope.borrarArticulo=function($index){
      $scope.articulos.splice($index,1);
    };
    $scope.imprimeTicket=function(){
      var ventimp=window.open('');
      ventimp.document.write("asdasd");
      ventimp.document.close();
      ventimp.print();
      ventimp.close();
      //window.print();
    };
    $scope.articulo = {};
    $scope.$watch(function(){
      var sum=0,sum2=0;

        $scope.articulos.forEach(function(art){
            if(art.subtotal){
              sum=sum+art.subtotal;
            }
            if(art.sub_desc){
              sum2=sum2+art.sub_desc;
            }
        });
        $scope.total=sum;
        $scope.total_desc=sum2;
    });
    $scope.calculaDescuento=function(articulo){
      articulo.sub_desc=articulo.subtotal-(articulo.subtotal*articulo.descuento)/100;
    };

    $scope.prendas = Prendas;

  })

;
