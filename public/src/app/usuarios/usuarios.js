angular.module('ngBoilerplate.usuarios', [
  'ui.router',
  'ngResource'
])


.config(function config($stateProvider) {
  $stateProvider.state('usuarios', {
    url: '/usuarios',
    views: {
      "main": {
        controller: 'usuariosCtrl',
        templateUrl: 'usuarios/usuarios.tpl.html'
      }
    },
    data: {
      pageTitle: 'usuarios'
    }
  });
})

.controller('usuariosCtrl', function usuariosController($scope, $location, Usuarios, FormFactory, TableSearch) {
  $scope.items = [];
  var sortingOrder = 'nombre';
  $scope.sortingOrder = sortingOrder;
  $scope.headers = [{
    "class": "fa fa-sort",
    "text": "Nombre",
    "sort_by": "nombre"
  }, {
    "class": "fa fa-sort",
    "text": "Tipo de usuario",
    "sort_by": "tipo_usuario"
  }];
  TableSearch.search($scope);


  $scope.init = function() {
    Usuarios.search({
      borrado: "0"
    }, function(data) {
      $scope.items = data;
      $scope.search();
    });
  };
    $scope.guardar = function() {
    Usuarios.add($scope.usuario, function() {
      $scope.usuario = {};
      $scope.init();
    });
  };

  $scope.cancelar = function() {
    $scope.usuario = {};
  };
  $scope.remove = function(item) {
    if (confirm("¿Seguro que desea eliminar este elmento?")) {
      Usuarios.remove({
        id: item.id
      }, function() {
        $scope.items.splice($scope.items.indexOf(item), 1);
        $scope.search();
      });
    }
  };
  $scope.buscar = function(field, item) {
    var search = {};
    if (item) {
      search[field] = item[field];
    } else {
      search[field] = $scope.usuario[field];
    }
    Usuarios.search(search, function(items) {
      var field = null;
      if (!item) {
        field = $scope.usuario[field];
      }

      if (items && items[0]) {
        $scope.usuario = items[0];
      } else {
        $scope.usuario.id = false;
      }

      if (!item) {
        $scope.usuario[field] = field;
      }
    });
  };
  $scope.edit = function(item) {
    $scope.buscar('id', item);
  };
  $scope.init();
})

;