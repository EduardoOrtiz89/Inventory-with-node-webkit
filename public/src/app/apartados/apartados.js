angular.module('ngBoilerplate.apartados', [
  'ui.router',
  'ngResource',
  'util.datepicker',
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
    $stateProvider.state('apartados_fechai', {
    url: '/apartados/:fechai',
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
  .factory('NumTicket', function($resource) {
    return $resource('/num-ticket', {}, {
      get: {
        method: 'GET'
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

.controller('modalController', function($scope, $compile, $filter, $modalInstance, tables, FormFactory, TableSearch, prenda, articulos,$stateParams) {

  var sortingOrder = 'codigo';
  $scope.sortingOrder = sortingOrder;
  var prendasCodigo = ["sacos", "pantalones", "chalecos"];
  var prendasEstilo = ["sacos", "pantalones", "chalecos"];
  var prendasColor = ["sacos", "pantalones", "chalecos", "camisas", "togas", "corbatas", "gaznes", "corbatines", "monios"];
  var prendasCuello = [];
  var prendasTalla = ["sacos", "pantalones", "chalecos", "camisas", "togas", "zapatos"];
  var prendasCantidad = ["togas", "corbatas", "corbatines", "gaznes", "monios", "zapatos"];
  $scope.headers = [];
  $scope.columns = []; 
  var getDescription = function(item) {
    var desc = prenda.description;

    if (prendasCodigo.indexOf(prenda.name) !== -1) {
      desc += " " + item.codigo;
    }
    if (prendasEstilo.indexOf(prenda.name) !== -1) {
      desc += " estilo " + item.estilo_desc;
    }
    if (prendasColor.indexOf(prenda.name) !== -1) {
      desc += " c. " + item.color_desc;
    }
    if (prendasCuello.indexOf(prenda.name) !== -1) {
      desc += " cuello " + item.cuello;
    }
    if (prendasTalla.indexOf(prenda.name) !== -1) {
      desc += " t. " + item.talla;
    }
    return desc;
  };
  if (prendasCodigo.indexOf(prenda.name) !== -1) {
    $scope.headers.push({
      "class": "fa fa-sort",
      "text": "codigo",
      "sort_by": "codigo"
    });
    $scope.columns.push("codigo");
  }
  if (prendasEstilo.indexOf(prenda.name) !== -1) {
    $scope.headers.push({
      "class": "fa fa-sort",
      "text": "Estilo",
      "sort_by": "estilo"
    });
    $scope.columns.push("estilo_desc");
  }
  if (prendasColor.indexOf(prenda.name) !== -1) {
    $scope.headers.push({
      "class": "fa fa-sort",
      "text": "Color",
      "sort_by": "color"
    });
    $scope.columns.push("color_desc");
  }
  if (prendasCuello.indexOf(prenda.name) !== -1) {
    $scope.headers.push({
      "class": "fa fa-sort",
      "text": "Cuello",
      "sort_by": "cuello"
    });
    $scope.columns.push("cuello");
  }
  if (prendasTalla.indexOf(prenda.name) !== -1) {
    $scope.headers.push({
      "class": "fa fa-sort",
      "text": "Talla",
      "sort_by": "talla"
    });
    $scope.columns.push("talla");
  }

  if (prendasCantidad.indexOf(prenda.name) === -1) {
    $scope.headers.push(

      {
        "class": "fa fa-sort",
        "text": "Nuevos",
        "sort_by": "nuevos"
      });
    $scope.headers.push({
      "class": "fa fa-sort",
      "text": "Usados",
      "sort_by": "usados"
    });
    $scope.columns.push("nuevos");
    $scope.columns.push("usados");
  } else {
    $scope.headers.push({
      "class": "fa fa-sort",
      "text": "Cantidad",
      "sort_by": "usados"
    });
    $scope.columns.push("usados");
  }
  $scope.headers.push({
    "class": "fa fa-sort",
    "text": "Disponibles",
    "sort_by": "disponibles"
  });
  $scope.cantidad = 1;

  $scope.columns.push("disponibles");
  tables[prenda.name].get({ funcion: {OR: [1,3]} ,borrado:0},function(data) {
    $scope.items = data;
    $scope.search();
    articulos.forEach(function(art) {
      if (prenda.name === art.prenda) {
        data.forEach(function(item) {
          if (item.id === art.id) {
            item.disponibles = item.disponibles - art.cantidadElegida;
          }
        });
      }
    });
  });
  TableSearch.search($scope);
  $scope.add = function(item) {
    var cantidad = parseInt($scope.cantidad, 10);
    if (cantidad <= 0 || typeof cantidad !== 'number' || isNaN(cantidad) || !isFinite(cantidad)) {
      $scope.message_error = "Cantidad inválida";
      return;
    }
    if (cantidad > item.disponibles) {
      $scope.message_error = "Cantidad de artículos no disponibles";
      return;
    }
    item.cantidadElegida = $scope.cantidad;
    item.tipoPrenda = prenda.description;
    item.prenda = prenda.name;
    item.completeDescription = getDescription(item);
    item.costo_renta = item.costo_renta.toFixed(2);
    item.subtotal = parseFloat($scope.cantidad) * parseFloat(item.costo_renta);
    item.subtotal = item.subtotal.toFixed(2);
    item.descuento = 0;
    item.sub_desc = item.subtotal;
    $modalInstance.close(item);
  };


  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
})

.controller('apartadosCtrl', function apartadosController($scope, NumTicket, $dialogs, $window, $templateCache, $compile, $cookies, $log, $filter, $modal, apartados,
  $location, tables, Prendas, Tickets,DatePicker,$stateParams) {

  $scope.articulos = [];
  $scope.agregarArticulo = function() {
    if (!$scope.articulo.tipoPrenda) {
      return;
    }
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'modalController',
      size: "lg",
      windowClass: 'modal-table',
      resolve: {
        prenda: function() {
          return $scope.articulo.tipoPrenda;
        },
        articulos: function() {
          return $scope.articulos;
        }

      }
    });

    modalInstance.result.then(function(selectedItem) {

      $scope.articulos.push(selectedItem);
    }, function() {
      //dismiss
    });
  };

  $scope.borrarArticulo = function($index) {
    $scope.articulos.splice($index, 1);
  };
  $scope.formatDate=function(date){
    var day=date.getDate(),
    month=(parseInt(date.getMonth(),10)+1);
    if(day<10){
      day="0"+day;
    }
    if(month<10){
      month="0"+month;
    }
    return day+"-"+month+"-"+date.getFullYear();

  };
  $scope.imprimeTicket = function() {
    $scope.data = {};
    NumTicket.get(function(ticket) {
      $scope.cliente.id = ticket.numTicket;
      var ventimp = window.open('');
      var tpl = ($compile($templateCache.get('tickets/rentas.tpl.html'))($scope));
      ventimp.document.body.appendChild(tpl[0]);
      //ventimp.moveTo(4999,4999);
      setTimeout(function() {
        ventimp.print();
        ventimp.close();

        $dialogs.confirm('Ticket', '¿Desea guardar la renta del artículo?').result.then(function(btn) {
          Tickets.add({
            cliente: $scope.cliente,
            articulos: $scope.articulos
          },function(res){
            if(res[0].error){
              dlg = $dialogs.error('Error '+res[0].msg);
            }else{
              dlg = $dialogs.notify('Ticket guardado','Ticket guardado con éxito con el número '+$scope.cliente.id+', si desea cancelarlo vaya a la sección de rentas');
              console.log(dlg);
            }
              $scope.articulos=[];
              $scope.cliente={};
          });
        }, function(btn) {

        });
      },1000);
    });


    //ventimp.close();
    //ventimp.document.close();
    //
    //
    //window.print();
  };
  $scope.articulo = {};
  $scope.$watch(function() {
    var sum = 0,
      sum2 = 0;

    $scope.articulos.forEach(function(art) {
      if (art.subtotal) {
        sum = parseFloat(sum) + parseFloat(art.subtotal);
      }
      if (art.sub_desc) {
        sum2 = parseFloat(sum2) + parseFloat(art.sub_desc);
      }
    });
    $scope.total = sum;
    $scope.total = $scope.total.toFixed(2);
    $scope.total_desc = sum2;
    $scope.total_desc = $scope.total_desc.toFixed(2);
  });
  $scope.calculaDescuento = function(articulo) {
    articulo.sub_desc = articulo.subtotal - (articulo.subtotal * articulo.descuento) / 100;
    articulo.sub_desc = articulo.sub_desc.toFixed(2);
  };

  $scope.prendas = Prendas;
  $scope.cliente = {};
  $scope.cliente.nombre = "Eduardo Ortiz Alvarado";
  $scope.cliente.calle = "5 de mayo no. 81";
  $scope.cliente.colonia = "La Victoria";
  $scope.cliente.ciudad = "Guadalupe";
  $scope.cliente.telefono = "4921466019";
  $scope.cliente.anticipo = "100";
  DatePicker.init($scope);
  $scope.cliente.fecha_apartado = new Date();
  $scope.cliente.fecha_devolucion = new Date();
  $scope.cliente.fecha_entrega = new Date();

 if($stateParams.fechai){
  var time=new Date();
  time.setTime($stateParams.fechai);
  $scope.cliente.fecha_apartado=time;
  $scope.cliente.fecha_devolucion=time;
  $scope.cliente.fecha_entrega=time;
  $scope.history=true;
  $scope.historyBack=function(){
    $window.history.back();
  };
 }




})

;