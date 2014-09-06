angular.module('ngBoilerplate', [
  'templates-app',
  'templates-common',
  'ngBoilerplate.rentas',
  'ngBoilerplate.ventas',
  'ngBoilerplate.login',
  'ngBoilerplate.sacos',
  'ngBoilerplate.camisas',
  'ngBoilerplate.chalecos',
  'ngBoilerplate.togas',
  'ngBoilerplate.pantalones',
  'ngBoilerplate.monios',
  'ngBoilerplate.corbatas',
  'ngBoilerplate.corbatines',
  'ngBoilerplate.gaznes',
   'ngBoilerplate.zapatos',
   'ngBoilerplate.apartados',
   'ngBoilerplate.estilos',
   'ngBoilerplate.colores',
  'ui.router',
  'ngSanitize',
  'ui.select',
  'ui.bootstrap',
  'ngResource',
  'ngCookies'
])

.config(function myAppConfig($stateProvider, $urlRouterProvider,uiSelectConfig) {
  uiSelectConfig.theme = 'bootstrap';
  $urlRouterProvider.otherwise('/apartados');
})

.run(function run($cookies, $location, $rootScope) {
  $cookies.access=1;
  if (!$cookies.access) {
    $location.path('/login');
  }
  $rootScope.$on('$locationChangeStart', function(ev, next, curr) {
    if (!$cookies.access) {
      $location.path('/login');
    }
  });
})

.factory('Prendas',function(){
  return  [{
    name: "sacos",
    description: "Sacos"
  }, {
    name: "pantalones",
    description: "Pantalones"
  }, {
    name: "camisas",
    description: "Camisas"
  },

  {
    name: "chalecos",
    description: "Chalecos"
  },
  {
    name: "togas",
    description: "Togas"
  }, {
    name: "corbatas",
    description: "Corbatas"
  }, {
    name: "corbatines",
    description: "Corbatines"
  }, {
    name: "gaznes",
    description: "Gaznes"
  }, {
    name: "monios",
    description: "Moños"
  }, {
    name: "zapatos",
    description: "Zapatos"
  }];
})
.factory('colores', function($resource) {
  return $resource('/colores/:_id',{id: '@_id'},
      {
       get: {method: 'GET', isArray: true },
       add: {method: 'POST'},
       remove: {method: 'DELETE'},
       update: {method: 'POST'},
       search: {method: 'GET', isArray: true}
      }
  );
})
.factory('estilos', function($resource) {
  return $resource('/estilos/:_id',{id: '@_id'},
      {
       get: {method: 'GET', isArray: true },
       add: {method: 'POST'},
       remove: {method: 'DELETE'},
       update: {method: 'POST'},
       search: {method: 'GET', isArray: true}
      }
  );
})
.factory('tables',function($resource,Prendas){

  var tables={};
for(var i=0; i<Prendas.length; i++){
     tables[Prendas[i].name]=$resource('/'+Prendas[i].name+'/:_id',{
       id: '@_id'
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
}
  return tables;
})
  .factory('Window', function() {
    var gui = require('nw.gui');
    return gui.Window.get();
  })
  .factory('FormFactory',function(){
    return {
   init: function($scope,Resource,Prendas){
     $scope.prendas=Prendas;
       $scope.init=function(){
          Resource.get(function(data){
            $scope.items=data;
            $scope.search();
          });
        };
        $scope.guardar=function(){

          delete $scope.prenda.color_desc;
          delete $scope.prenda.estilo_desc;
          //console.log($scope.prenda);
            Resource.add($scope.prenda,function(item){
               $scope.init();
               $scope.prenda={};
            });
        };
        $scope.cancelar=function(){
            $scope.prenda={};
        };
        $scope.remove=function(item){
          if(confirm("¿Seguro que desea eliminar este elmento?")){
            Resource.remove({_id:item.id},function(){
               $scope.items.splice($scope.items.indexOf(item), 1);
               $scope.search();
            });
          }
        };
        $scope.buscar=function(field,item){
          var search={};
          if(item){
              search[field]=item[field];
          }else{
            search[field]=$scope.prenda[field];
          }
           Resource.search(search,function(items){
             var field=null;
             if(!item){
              field=$scope.prenda[field];
            }

            if(items && items[0]){
              $scope.prenda=items[0];
            }else{
              $scope.prenda.id=false;
            }

            if(!item){
              $scope.prenda[field]=field;
            }
           });
        };
        $scope.edit=function(item){
          $scope.buscar('id',item);

          //$scope.prenda=angular.copy(item);
        };
      }};
  })
  .factory('TableSearch', function($filter) {
   return { search: function($scope) {
        $scope.reverse = false;
        $scope.filteredItems = [];
        $scope.groupedItems = [];
        $scope.itemsPerPage = 10;
        $scope.pagedItems = [];
        $scope.currentPage = 0;
      $scope.items = [];
      $scope.searchMatch = function(haystack, needle) {
        if (!needle) {
          return true;
        }
        haystack = haystack + "";
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
      };
      // init the filtered items
      $scope.search = function() {
        $scope.filteredItems = $filter('filter')($scope.items, function(item) {
          for (var attr in item) {
            if ($scope.searchMatch(item[attr], $scope.query)) {
              return true;
            }
          }
          return false;
        });
        // take care of the sorting order
        if ($scope.sortingOrder !== '') {
          $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
      };

      // calculate page in place
      $scope.groupToPages = function() {
        $scope.pagedItems = [];
        for (var i = 0; i < $scope.filteredItems.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
          } else {
            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
          }
        }
      };

      $scope.range = function(start, end) {
        var ret = [];
        if (!end) {
          end = start;
          start = 0;
        }
        for (var i = start; i < end; i++) {
          ret.push(i);
        }
        return ret;
      };

      $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
          $scope.currentPage--;
        }
      };

      $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
          $scope.currentPage++;
        }
      };

      $scope.setPage = function() {
        $scope.currentPage = this.n;
      };

      // change sorting order
      $scope.sort_by = function(item) {
        var newSortingOrder = item.sort_by;
        if ($scope.sortingOrder == newSortingOrder) {
          $scope.reverse = !$scope.reverse;
        }

        $scope.sortingOrder = newSortingOrder;
        for (var i = 0; i < $scope.headers.length; i++) {
          $scope.headers[i].class = "fa fa-sort";

        }
        if ($scope.reverse) {
          item.class = "fa fa-sort-desc";
        } else {
          item.class = "fa fa-sort-asc";
        }
      };
      return $scope;
    }
  };
  })
  .controller('AppCtrl', function AppCtrl($scope, $location, Window, $cookies, $filter) {
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      if (angular.isDefined(toState.data.pageTitle)) {
        $scope.pageTitle = toState.data.pageTitle;
      }
      $scope.access = $cookies.access;
      $scope.windowMinimize = function() {
        Window.minimize();
      };

      $scope.windowToggleFullscreen = function() {
        Window.toggleFullscreen();
      };

      $scope.windowClose = function() {
        $cookies.access = null;
        Window.close();
      };



    });
  })

;
