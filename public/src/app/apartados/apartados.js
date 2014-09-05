angular.module('ngBoilerplate.apartados', [
  'ui.router',
  'ngResource'
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
  .controller('apartadosCtrl', function apartadosController($scope, apartados,
    $location, TableSearch, FormFactory) {
    $scope.items = [1];
    $scope.articulo = {};
    $scope.prendasCodigo = ["Sacos", "Pantalones", "Camisas", "Chalecos"];
    $scope.prendasEstilo = ["Sacos", "Pantalones", "Camisas", "Chalecos"];

    $scope.prendas = [{
      name: "sacos",
      description: "Sacos"
    }, {
      name: "pantalones",
      description: "Pantalones"
    }, {
      name: "camisas",
      description: "Camisas"
    }, {
      name: "togas",
      description: "Togas"
    }, {
      name: "corbatas",
      description: "Corbatas"
    }, {
      name: "corbatines",
      description: "Corbatines"
    }, {
      name: "gazne",
      description: "Gazne"
    }, {
      name: "monios",
      description: "Moños"
    }, {
      name: "zapatos",
      description: "Zapatos"
    }];


  })

;
