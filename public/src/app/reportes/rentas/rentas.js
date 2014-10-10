angular.module('ngBoilerplate.reportes_rentas', [
  'ui.router',
  'ngResource',
  'util.datepicker'
])
  .config(function config($stateProvider) {
    $stateProvider.state('reportes_rentas', {
      url: '/reportes-rentas',
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
  .controller('reportesRentasCtrl', function reportesRentasCtrl($scope, DatePicker, Prendas, Reportes, Dates, $location, ReportesCache) {
    var type = "reportes";
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
    $scope.getColor=function(item){
      var currentDate=new Date().setHours(0, 0, 0, 0),
      fentrega= new Date(item.fecha_entrega).setHours(0, 0, 0, 0),
      fdevolucion=new Date(item.fecha_devolucion).setHours(0, 0, 0, 0),
      date=null;
      console.log(fentrega);
      console.log(fdevolucion);
      if(item.status_id===1){
        if(currentDate>fentrega || currentDate > fdevolucion){
          return "danger";
        }
      }else
      if(item.status_id===2){
        if(currentDate > fdevolucion){
          return "danger";
        }
      }
      return "";
    };
  })

;