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
    data:{ pageTitle: 'pantalones' }
  });
})

.factory('Pantalones', function($resource) {
    return $resource('/pantalones',{},
        {
         add: {method: 'POST'}
        }
    );
  })


.controller( 'pantalonesCtrl', function ( $scope,Pantalones,$location ) {
  $scope.guardar=function(){
    console.log("Estoy guardando");
    Pantalones.add($scope.pantalon,function(){
      $location.path("/rentas"); //por mientras
    });
  };






/*$scope.pantalon={};
$scope.pantalon.codigo=123;
$scope.pantalon.estilo="cholo";
$scope.pantalon.talla="Extra Smalville";
*/



})

;

