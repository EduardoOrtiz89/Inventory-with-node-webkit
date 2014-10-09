/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.rentas', [
  'ui.router'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider.state( 'rentas', {
    url: '/rentas',
    views: {
      "main": {
        controller: 'RentasCtrl',
        templateUrl: 'rentas/rentas.tpl.html'
      }
    },
    data:{ pageTitle: 'Rentas' }
  });


  $stateProvider.state( 'rentas_ticket', {
    url: '/rentas/:ticketId',
    views: {
      "main": {
        controller: 'RentasCtrl',
        templateUrl: 'rentas/rentas.tpl.html'
      }
    },
    data:{ pageTitle: 'Rentas' }
  });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'RentasCtrl', function RentasController( $scope,$window,Tickets, $dialogs,$stateParams ) {


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
    var msg=$scope.tick.status===0?"¿Desea cancelar este ticket?": '¿Desea cambiar el estatus de este ticket? ';
    $dialogs.confirm('Ticket',msg).result.then(function(btn) {
        Tickets.update({id: $scope.tick.ticket_id,status:$scope.tick.status },function(){
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




  $scope.consultaTicket=function(){

    Tickets.get({id:$scope.ticket.id},function(result){
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

