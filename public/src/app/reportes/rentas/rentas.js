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
  .controller('reportesRentasCtrl', function reportesRentasCtrl($scope, DatePicker, Prendas, Reportes,Dates,$location) {
    $scope.filtrar = function() {
      $scope.reporte.fecha_inicial.setHours(0,0,0,0).toString();
      $scope.reporte.fecha_final.setHours(23,59,59,999).toString();
      Reportes.show({
        type: 'HISTORICO',
        fecha_inicial: $scope.reporte.fecha_inicial,
        fecha_final: $scope.reporte.fecha_final
      }, function(result) {
        $scope.items=result;
      });
    };

    DatePicker.init($scope);
    $scope.formatDate=Dates.formatDate;
    if (!$scope.reporte) {
      $scope.reporte = {};
    }
    $scope.reporte.fecha_inicial = new Date();
    $scope.reporte.fecha_final = new Date();
    $scope.getTicket=function(item){
       $location.path('/rentas/'+item.id);
    };

  })

;