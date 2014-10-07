'use strict';
module.exports.init = function(app, connection, models, db) {
  var Ticket = models.Ticket,
    Renta = models.Renta;

  app.get('/num-ticket', function(req, res) {
    var ret = false;
    connection.runSqlEach('select seq+1 as nextvalue from sqlite_sequence where name=?', ['tickets'],
      function each(err, result) {
        ret = result.nextvalue;
      }, function complete() {
        if (!ret) {
          ret = 1;
        }
        res.send({
          numTicket: ret
        });
      });
  });
  app.get('/tickets/:id', function(req, res) {
    var id = req.params.id;
    connection.runSqlAll(
      ['select  tickets.*, tickets.id as ticket_id, tickets.nombre as tnombre,prendas.* , rentas.*, rentas.nombre as srnombre, rentas.cantidad as cantidadElegida,tipo_prendas.description as tpdescription, tipo_prendas.name as tpnombre, colores.color as color_desc, estilos.estilo as estilo_desc,status_tickets.description as status_desc',
        'from tickets',
        'left join rentas on rentas.ticket_id=tickets.id',
        'left join prendas on prendas.id=rentas.prenda_id',
        'left join tipo_prendas on tipo_prendas.id=prendas.tipo_prenda',
        'left join colores on colores.id=prendas.color',
        'left join estilos on estilos.id=prendas.estilo',
        'left join status_tickets on status_tickets.id=tickets.status',
        'where tickets.id=?'
      ].join(" "), [id], function(err, prenda) {
        if(err){
          res.send(err);
        }else{
          res.send(prenda);
        }
      });
  });
  app.put('/tickets/:id',function(req,res){
    var id =req.params.id,
    status=req.body.status;
     Ticket.update(connection,parseInt(id,10),{"status":status},function(err){
       if(err){ res.send({error:true,msg: err}); return ;}
       res.send({"id": id, "status": status});
     });
  });
  app.post('/tickets', function(req, res) {
    if (!req.body.cliente) {
      res.send('error');
      return;
    }
    var ticket = new Ticket(req.body.cliente);
    ticket.save(connection, function(err) {
      if (err) {
        res.send(err);
        return;
      }
      if (req.body.articulos) {
        var art = req.body.articulos;
        var saves = [];
        for (var i = 0; i < art.length; i++) {
          var renta = new Renta({
            prenda_id: art[i].id,
            ticket_id: ticket.id,
            nombre: art[i].nombre,
            cantidad: art[i].cantidadElegida,
            descuento: art[i].descuento,
            observaciones: art[i].observaciones
          });
          saves.push(renta.save);
        }
        connection.chain(saves, function(err, results) {
          if (err) {
            res.send([{error:true,msg: err}]);
            return;
          }
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