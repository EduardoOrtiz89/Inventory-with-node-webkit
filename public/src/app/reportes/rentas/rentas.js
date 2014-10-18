angular.module('ngBoilerplate.reportes_rentas', [
  'ui.router',
  'ngResource',
  'util.datepicker'
])
  .config(function config($stateProvider) {
    $stateProvider.state('reportes_rentas', {
      url: '/reportes/rentas',
      views: {
        "main": {
          controller: 'reportesRentasCtrl',
          templateUrl: 'reportes/rentas/rentas.tpl.html'
        }
      },
      data: {
        pageTitle: 'Reportes de rentas'
      }
    });
  })
  .factory('ReportesCache', ['$cacheFactory',
    function($cacheFactory) {
      return $cacheFactory('reportes');
    }
  ])
  .controller('reportesRentasCtrl', function reportesRentasCtrl($scope, $templateCache,$compile,Tickets, DatePicker, SettingsGet, Prendas, Reportes, Dates, $location, ReportesCache) {
    var type = "reportes";
    SettingsGet.get({
      keys: ["telefono", "direccion", "footer", "recargos"]
    }, function(result) {
      $scope.settings = {};
      if (result) {
        for (var i = 0; i < result.length; i++) {
          $scope.settings[result[i][0].key] = result[i][0].value;
        }
      }
    });

var prendasCodigo = ["sacos", "pantalones", "chalecos"];
  var prendasEstilo = ["sacos", "pantalones", "chalecos"];
  var prendasColor = ["sacos", "pantalones", "chalecos", "camisas", "togas", "corbatas", "gaznes", "corbatines", "monios"];
  var prendasCuello = [];
  var prendasTalla = ["sacos", "pantalones", "chalecos", "camisas", "togas", "zapatos"];
  var prendasCantidad = ["togas", "corbatas", "corbatines", "gaznes", "monios", "zapatos"];
    var getDescription = function(item) {
    var desc = item.tpdescription;

    if (prendasCodigo.indexOf(item.tpnombre) !== -1) {
      desc += " " + item.codigo;
    }
    if (prendasEstilo.indexOf(item.tpnombre) !== -1) {
      desc += " estilo " + item.estilo_desc;
    }
    if (prendasColor.indexOf(item.tpnombre) !== -1) {
      desc += " c. " + item.color_desc;
    }
    if (prendasCuello.indexOf(item.tpnombre) !== -1) {
      desc += " cuello " + item.cuello;
    }
    if (prendasTalla.indexOf(item.tpnombre) !== -1) {
      desc += " t. " + item.talla;
    }
    return desc;
  };
    $scope.print = function() {
      if (Object.keys($scope.arts).length !== 0) {
         var ventimp = window.open(''); 
        Object.keys($scope.arts).forEach(function(key) {
          if ($scope.arts[key]) {
            Tickets.get({
              id: key
            }, function(result) {
              var scope = $scope.$new(true);
              scope.settings=$scope.settings;
              var items = result;
              var tick = result[0];
             $scope.total = 0;
              scope.total_desc = 0;
              for (var i = 0; i < items.length; i++) {
                items[i].completeDescription = getDescription(items[i]);
                items[i].subtotal = parseFloat(items[i].cantidadElegida) * parseFloat(items[i].costo_renta);
                items[i].subtotal = items[i].subtotal.toFixed(2);
                scope.total += parseFloat(items[i].subtotal);
                items[i].sub_desc = items[i].subtotal - (items[i].subtotal * items[i].descuento) / 100;
                items[i].sub_desc = items[i].sub_desc.toFixed(2);
                scope.total_desc += parseFloat(items[i].sub_desc);
              }
              scope.total_desc = scope.total_desc.toFixed(2);
              scope.cliente = tick;
              scope.articulos = items;
              scope.cliente.id = key;
              var tpl = ($compile($templateCache.get('tickets/rentas.tpl.html'))(scope));
              console.log(tpl);
              ventimp.document.body.appendChild(tpl[0]);
              ventimp.moveTo(4999,4999);
              setTimeout(function() {
               ventimp.print();
              ventimp.close();
              },1000);


            });
          }
        });
      }
    };
    $scope.filtrar = function() {
      $scope.reporte.fecha_inicial.setHours(0, 0, 0, 0);
      $scope.reporte.fecha_final.setHours(23, 59, 59, 999);
      ReportesCache.put(type, {
        fecha_inicial: $scope.reporte.fecha_inicial,
        fecha_final: $scope.reporte.fecha_final,
        status: $scope.reporte.status,
        tipo_fecha: $scope.reporte.tipo_fecha
      });
      Reportes.show({
        type: type,
        fecha_inicial: $scope.reporte.fecha_inicial,
        fecha_final: $scope.reporte.fecha_final,
        status: $scope.reporte.status,
        tipo_fecha: $scope.reporte.tipo_fecha
      }, function(result) {
        $scope.items = result;
      });
    };
    if (!$scope.reporte) {
      $scope.reporte = {};
    }
    $scope.reporte.tipo_fecha = "fecha_apartado";
    var historico = ReportesCache.get(type);
    if (historico) {
      $scope.reporte.fecha_inicial = historico.fecha_inicial;
      $scope.reporte.fecha_final = historico.fecha_final;
      $scope.reporte.status = historico.status;
      $scope.reporte.tipo_fecha = historico.tipo_fecha;
      $scope.filtrar();
    } else {
      $scope.reporte.fecha_inicial = new Date();
      $scope.reporte.fecha_final = new Date();
    }
    DatePicker.init($scope);
    $scope.formatDate = Dates.formatDate;
    $scope.getTicket = function(item) {
      $location.path('/rentas/' + item.id);
    };
    $scope.getColor = function(item) {
      var currentDate = new Date().setHours(0, 0, 0, 0),
        fentrega = new Date(item.fecha_entrega).setHours(0, 0, 0, 0),
        fdevolucion = new Date(item.fecha_devolucion).setHours(0, 0, 0, 0),
        date = null;
      if (item.status_id === 1) {
        if (currentDate > fentrega || currentDate > fdevolucion) {
          return "danger";
        }
      } else
      if (item.status_id === 2) {
        if (currentDate > fdevolucion) {
          return "danger";
        }
      }
      return "";
    };
  })

;