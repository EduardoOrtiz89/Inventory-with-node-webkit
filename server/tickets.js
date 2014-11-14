'use strict';
module.exports.init = function(app, connection, models, db,persist) {
  var Ticket = models.Ticket,
    Renta = models.Renta;

  app.post('/pagos-rentas',function(req,res){
    var id=req.body.id,
         sql=["select pagos_rentas.* from pagos_rentas",
              "left join tickets on tickets.id=pagos_rentas.ticket_id",
              "where tickets.id=?"];

    connection.runSqlAll(sql.join(" "), [id],
        function (err, result) {
            if(err){res.send(err); return;}
            res.send(result);
        });
  });

  app.put('/pagos-rentas',function(req,res){
     var item = req.body;
    connection.runSql("INSERT into pagos_rentas(fecha,ticket_id,monto) values(?,?,?)", [new Date().toISOString(),item.ticket_id,item.monto], function(err, result) {
            if (err) {
              res.send(err);
              return;
            }
            res.send(item);
          });
  });
  app.delete('/pagos-rentas',function(req,res){
     var sql='delete from  pagos_rentas where id=?'
    var _id = req.query._id;
    connection.runSql(sql, [
      _id
    ], function(err, r) {
      res.send(_id);
    });
  });
  app.post('/disponibilidad',function(req,res){
   var sql=['select prendas.*,estilos.estilo as estilo_desc,', 
           'colores.color as color_desc,',
           'colores.id as color,',
           'estilos.id as estilo,',
           'prendas.id as id,',
           'nuevos+usados -',
            'ifnull((',
              'select  sum(rentas.cantidad) ',
              'from rentas ',
              'left join tickets on tickets.id=ticket_id',
              'where prenda_id=prendas.id',
              'and ( fecha_entrega < ?  and fecha_devolucion > ?) ',
              '),0)  as disponibles',
           'from prendas',
           'left join estilos on estilos.id=prendas.estilo ',
           'left join colores on colores.id=prendas.color ',
           'left join tipo_prendas on tipo_prendas.id =prendas.tipo_prenda',
           'where  prendas.borrado = 0 and  tipo_prendas.name = ?',
           'and (funcion = ? or funcion =3)',
           ].join(" ");
           connection.runSqlAll(sql, [req.body.fecha_devolucion_cliente,req.body.fecha_entrega_cliente,req.body.tipo_prenda,req.body.funcion],
                function (err, result) {
                    if(err){res.send(err); return;}
                    res.send(result);
                });

  });


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
    app.get('/num-ticket-ventas', function(req, res) {
    var ret = false;
    connection.runSqlEach('select seq+1 as nextvalue from sqlite_sequence where name=?', ['tickets_ventas'],
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

  app.get('/tickets-prendas/:id',function(req,res){
    var idPrenda=req.params.id;
     connection.runSqlAll(' select tickets.*,  rentas.*, tickets.nombre as nombre_ticket from tickets left join rentas on rentas.ticket_id=tickets.id where prenda_id=?',[idPrenda],function(err,rentas){
        if(err){
          res.send(err);
        }else{
          res.send(rentas);
        }
     });
  });
  app.get('/tickets/:id', function(req, res) {
    var id = req.params.id;
    connection.runSqlAll(
      ['select  tickets.*, tickets.id as ticket_id, tickets.nombre as tnombre,prendas.* , rentas.*, rentas.nombre as srnombre, rentas.cantidad as cantidadElegida,tipo_prendas.description as tpdescription, tipo_prendas.name as tpnombre, colores.color as color_desc, estilos.estilo as estilo_desc,status_tickets.description as status_desc, rentas.costo as costo_renta',
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
  app.get('/tickets-ventas/:id', function(req, res) {
    var id = req.params.id;
    connection.runSqlAll(
      ['select  tickets_ventas.*, tickets_ventas.id as ticket_id, tickets_ventas.nombre as tnombre,prendas.* , ventas.*, ventas.nombre as srnombre, ventas.cantidad as cantidadElegida,tipo_prendas.description as tpdescription, tipo_prendas.name as tpnombre, colores.color as color_desc, estilos.estilo as estilo_desc, ventas.costo as costo_renta, tickets_ventas.borrado as borrado',
        'from tickets_ventas',
        'left join ventas on ventas.ticket_id=tickets_ventas.id',
        'left join prendas on prendas.id=ventas.prenda_id',
        'left join tipo_prendas on tipo_prendas.id=prendas.tipo_prenda',
        'left join colores on colores.id=prendas.color',
        'left join estilos on estilos.id=prendas.estilo',
        'where tickets_ventas.id=?'
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

   app.put('/tickets-ventas/:id',function(req,res){
    var id =req.params.id,
    borrado=req.body.borrado;
      connection.runSql('update tickets_ventas set borrado=? where id=?',[borrado,parseInt(id,10)],function(err){
       if(err){ res.send({error:true,msg: err}); return ;}
       res.send({"id": id, "borrado": borrado});
     });
  });
  app.post('/tickets', function(req, res) {
    if (!req.body.cliente) {
      res.send('error');
      return;
    }
    var cliente=req.body.cliente;
    cliente.borrado=0;
    cliente.status=1;
    var ticket = new Ticket(cliente);
    ticket.save(connection, function(err) {
      if (err) {
         res.send([{error:true,msg: err,body: ticket}]);
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
            costo: art[i].costo_renta,
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



/*

{
  "nombre": "asd",
  "calle": "asd",
  "ciudad": "asd",
  "colonia": "asd",
  "telefono": "123",
  "id": 1,
  "borrado": 0,
  "status": 1
  -- Describe TICKETS_VENTAS
CREATE TABLE tickets_ventas(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT,
    "calle" TEXT,
    "colonia" TEXT,
    "ciudad" TEXT,
    "telefono" TEXT,
    "fecha_venta" TEXT,
    "borrado"  INTEGER default 0  )

}
*/

 app.post('/tickets-ventas', function(req, res) {
    if (!req.body.cliente) {
      res.send('error');
      return;
    }


    var cliente=req.body.cliente,
    today=new Date().toISOString();

    cliente.borrado=0;
    cliente.status=1;
    connection.runSql("Insert  into tickets_ventas(id,nombre,calle,ciudad,colonia,telefono,borrado,fecha_venta) values(?,?,?,?,?,?,?,?)", [
        cliente.id,cliente.nombre,cliente.calle,cliente.ciudad,cliente.colonia,cliente.relefono,0,today
      ], function(err, results) {
         if (err) {
         res.send([{error:true,msg: JSON.stringify(err),body: JSON.stringify(cliente)}]);
        return;
      }
      if (req.body.articulos) {
        var art = req.body.articulos;
        var saves = [];
        for (var i = 0; i < art.length; i++) {
          saves.push(db.runSql('insert into ventas(ticket_id,prenda_id,nombre,cantidad,descuento,nuevo,observaciones,costo) values(?,?,?,?,?,?,?,?)',[
            cliente.id,art[i].prenda_id,art[i].nombre,art[i].cantidad,art[i].descuento,art[i].nuevo,art[i].observaciones,art[i].costo
            ]));
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
