'use strict';





module.exports.init = function(app, connection, models, db) {
  app.post('/reportes', function(req, res) {
 var item = req.body;
var sql=["select tickets.*, sum((prendas.costo_renta*rentas.cantidad)-(prendas.costo_renta*rentas.cantidad)*(descuento/100) ) as total,",
			"count(rentas.id) as articulos,status_tickets.id as status_id, status_tickets.description as status",
			"from  tickets",
			"left join rentas on rentas.ticket_id=tickets.id",
			"left join prendas on rentas.prenda_id=prendas.id",
			"left join status_tickets on tickets.status=status_tickets.id",
			"left join tipo_prendas on tipo_prendas.id=prendas.tipo_prenda",
			"where tickets.borrado=0 ",
			"and "+item.tipo_fecha+"  between ? and ?",
			"and status_tickets.id="+item.status,
			"group by tickets.id",
			"order by "+item.tipo_fecha+" desc",
			];
		    var fi=item.fecha_inicial,
			    ff=item.fecha_final,
				params=[fi,ff];
			if(!item.status||item.status==="-1"){
				sql[9]="";
			}
			//res.send(sql.join(" ")); return;
    connection.runSqlAll(sql.join(" "),params,
      function(err, result) {
      	if(err){ res.send([{error:true,msg:JSON.stringify(err)}]); return;}
      	res.send(result);
      });
  });
};
