angular.module( 'ngBoilerplate.sacos', [
  'ui.router',
  'ngResource'
])


.config(function config( $stateProvider ) {
  $stateProvider.state( 'sacos', {
    url: '/sacos',
    views: {
      "main": {
        controller: 'sacosCtrl',
        templateUrl: 'sacos/sacos.tpl.html'
      }
    },
    data:{ pageTitle: 'sacos' }
  });
})
  .factory('Sacos', function($resource) {
    return $resource('/sacos',{},
        {
         add: {method: 'POST'}
        }
    );
  })
.controller( 'sacosCtrl', function sacosController( $scope,Sacos,$location ) {
  $scope.guardar=function(){
    console.log("Estoy guardando");
    Sacos.add($scope.saco,function(){
      $location.path("/rentas"); //por mientras
    });
  };

})

;

