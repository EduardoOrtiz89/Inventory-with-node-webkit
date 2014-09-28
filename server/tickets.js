'use strict';
module.exports.init = function(app, connection, models, db) {
  var Ticket = models.Ticket,
      Renta=models.Renta;

  app.get('/num-ticket', function(req, res) {
    var ret=false;
    connection.runSqlEach('select seq+1 as nextvalue from sqlite_sequence where name=?',['tickets'],
      function each(err,result) {
         ret=result.nextvalue;
      }, function complete() {
        if(!ret){
          ret=1;
        }
        res.send({
          numTicket: ret
        });
      });
  });
  app.post('/tickets', function(req, res) {
    if(!req.body.cliente){
      res.send('error'); 
      return;
    }
    var ticket = new Ticket(req.body.cliente);
    ticket.save(connection, function(err) {
      if(err){ res.send(err); return;}
        if(req.body.articulos){
          var art=req.body.articulos;
          var saves=[];
          for(var i=0; i<art.length; i++){
            var renta=new Renta({
              prenda_id: art[i].id,
              ticket_id: ticket.id,
              nombre:art[i].nombre,
              cantidad: art[i].cantidadElegida,
              descuento: art[i].descuento,
              observaciones: art[i].observaciones
            });
            saves.push(renta.save);
          }
          connection.chain(saves,function(err,results){
            if(err){res.send(err); return;}
            res.send(results);
          });
        }
    });
  });
};

/*
{
  'cliente': {
    'nombre': 'Eduardo Ortiz Alvarado',
    'calle': '5 de mayo no. 81',
    'colonia': 'La Victoria',
    'ciudad': 'Guadalupe',
    'telefono': '4921466019',
    'anticipo': '100',
    'fecha_apartado': '2014-09-27T05:29:39.733Z',
    'fecha_devolucion': '2014-09-27T05:29:39.733Z',
    'fecha_entrega': '2014-09-09T05:00:00.000Z',
    'numTicket': 1
  },
  'articulos': [
    {
      'id': 9,
      'codigo': 'ASDF',
      'estilo': 8,
      'color': 27,
      'talla': '1',
      'nuevos': 31,
      'usados': 3,
      'costo_nuevo': 23,
      'costo_usado': 2,
      'costo_renta': '12.00',
      'renta': null,
      'venta': null,
      'tipo_prenda': 1,
      'estilo_desc': 'Ipsum',
      'color_desc': 'Rosa',
      'disponibles': 3,
      'cantidadElegida': 1,
      'tipoPrenda': 'Sacos',
      'prenda': 'sacos',
      'completeDescription': 'Sacos ASDF estilo Ipsum c. Rosa t. 1',
      'subtotal': '12.00',
      'descuento': 0,
      'sub_desc': '12.00'
    }
  ]
}
*/