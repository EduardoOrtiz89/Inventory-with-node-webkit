angular.module( 'util.resources', [
])
.factory('Tickets', function($resource) {
    return $resource('/tickets/:id', {
      id: '@id'
    }, {
      get: {
        method: 'GET',
        isArray: true
      },
      add: {
        method: 'POST',isArray: true
      },
      remove: {
        method: 'DELETE'
      },
      update: {
        method: 'PUT'
      },
      search: {
        method: 'GET',
        isArray: true
      }
    });
  })
.factory('TicketsVentas', function($resource) {
    return $resource('/tickets-ventas/:id', {
      id: '@id'
    }, {
      get: {
        method: 'GET',
        isArray: true
      },
      add: {
        method: 'POST',isArray: true
      },
      remove: {
        method: 'DELETE'
      },
      update: {
        method: 'PUT'
      },
      search: {
        method: 'GET',
        isArray: true
      }
    });
  })
.factory('Usuarios', function($resource) {
    return $resource('/usuarios', {
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
        method: 'PUT'
      },
      search: {
        method: 'GET',
        isArray: true
      }
    });
  })
.factory('SettingsGet',function($resource){
   return $resource('/settings-get', {}, {
      get: {
        method: 'POST',
        isArray: true
      }
    });
})
.factory('SettingsPut',function($resource){
   return $resource('/settings-put', {}, {
      put: {
        method: 'POST',
        isArray: true
      }
    });
})
.factory('TicketsPrendas',function($resource){
      return $resource('/tickets-prendas/:id', {
      id: '@id'
    }, {
      get: {
        method: 'GET',
        isArray: true
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
}).factory('Reportes', function($resource) {
    return $resource('/reportes',{}, {
      show: {
        method: 'POST',
        isArray: true
      }
    });
  });


