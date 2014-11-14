angular.module( 'ngBoilerplate.tickets_ventas', [
  'ui.router'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'tickets_ventas', {
    url: '/tickets_ventas',
    views: {
      "main": {
        controller: 'TicketsVentasCtrl',
        templateUrl: 'ventas/tickets_ventas.tpl.html'
      }
    },
    data:{ pageTitle: 'Tickets de Ventas' }
  });


  $stateProvider.state( 'tickets_ventas_id', {
    url: '/tickets_ventas/:ticketId',
    views: {
      "main": {
        controller: 'TicketsVentasCtrl',
        templateUrl: 'ventas/tickets_ventas.tpl.html'
      }
    },
    data:{ pageTitle: 'Tickets de Ventas' }
  });
})
.controller( 'TicketsVentasCtrl', function RentasController( $scope,$window, SettingsGet,$compile,$templateCache,TicketsVentas, $dialogs,$stateParams ) {

    SettingsGet.get({keys:["telefono", "direccion","footer", "recargos"]},function(result){
      $scope.settings={};
      if(result){
        for(var i=0; i<result.length; i++){
          $scope.settings[result[i][0].key]=result[i][0].value;
        }
      }
    });

var prendasCodigo = ["sacos", "pantalones", "chalecos"];
  var prendasEstilo = ["sacos", "pantalones", "chalecos"];
  var prendasColor = ["sacos", "pantalones", "chalecos", "camisas", "togas", "corbatas", "gaznes", "corbatines", "monios"];
  var prendasCuello = [];
  var prendasTalla = ["sacos", "pantalones", "chalecos", "camisas", "togas", "zapatos"];
  var prendasCantidad = ["togas", "corbatas", "corbatines", "gaznes", "monios", "zapatos"];

 $scope.formatDate=function(date){
    date=new Date(date);
    var day=date.getDate(),
    month=(parseInt(date.getMonth(),10));
    if(day<10){
      day="0"+day;
    }
    var months=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return day+"-"+months[month]+"-"+date.getFullYear();

  };
  $scope.guardaStatus=function(){
    var msg=$scope.tick.borrado===1?"¿Desea cancelar este ticket?": '¿Desea cambiar el estatus de este ticket? ';
    $dialogs.confirm('Ticket',msg).result.then(function(btn) {
        TicketsVentas.update({id: $scope.tick.ticket_id,borrado:$scope.tick.borrado },function(){
           $scope.tick=null;
           $scope.items=[];
           $scope.ticket.id="";
        });
    });
  };
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

  $scope.print=function(){
    $scope.cliente=$scope.tick;
    $scope.articulos=$scope.items;
      $scope.cliente.id = $scope.ticket.id;
      var ventimp = window.open('');
      var tpl = ($compile($templateCache.get('tickets/ventas.tpl.html'))($scope));
      ventimp.document.body.appendChild(tpl[0]);
      ventimp.moveTo(4999,4999);
      setTimeout(function() {
        ventimp.print();
        ventimp.close();
      },1000);
  };


  $scope.consultaTicket=function(){

    TicketsVentas.get({id:$scope.ticket.id},function(result){
      $scope.items=result;
      $scope.tick=result[0];
      $scope.total=0;
      $scope.total_desc=0;
      for(var i=0; i<$scope.items.length; i++){
        $scope.items[i].completeDescription=getDescription($scope.items[i]);
        $scope.items[i].subtotal = parseFloat($scope.items[i].cantidadElegida) * parseFloat($scope.items[i].costo_renta);
        $scope.items[i].subtotal =$scope.items[i].subtotal.toFixed(2);
        $scope.total+=parseFloat($scope.items[i].subtotal);
       $scope.items[i].sub_desc = $scope.items[i].subtotal - ($scope.items[i].subtotal * $scope.items[i].descuento) / 100;
       $scope.items[i].sub_desc = $scope.items[i].sub_desc.toFixed(2);
       $scope.total_desc+=parseFloat($scope.items[i].sub_desc);
      }
      $scope.total_desc=$scope.total_desc.toFixed(2);

    });
  };
 if($stateParams.ticketId){
  $scope.ticket={};
  $scope.ticket.id=$stateParams.ticketId;
  $scope.consultaTicket();
  $scope.history=true;
  $scope.historyBack=function(){
    $window.history.back();
  };
 }

})

;

