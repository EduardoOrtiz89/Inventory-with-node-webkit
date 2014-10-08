'use strict';





module.exports.init = function(app, connection, models, db) {
  app.post('/reportes', function(req, res) {
 var item = req.body;
var sql=["select tickets.*, sum((prendas.costo_renta*rentas.cantidad)-(prendas.costo_renta*rentas.cantidad)*(descuento/100) ) as total,",
			"count(rentas.id) as articulos",
			"from  tickets",
			"left join rentas on rentas.ticket_id=tickets.id",
			"left join prendas on rentas.prenda_id=prendas.id",
			"left join tipo_prendas on tipo_prendas.id=prendas.tipo_prenda",
			"where tickets.borrado=0 ",
			"and fecha_devolucion  between ? and ?",
			"and status=3",
			"and tipo_prendas.name=?",
			"group by tickets.id",
			"order by fecha_devolucion desc",
			];
		    var fi=item.fecha_inicial,
			    ff=item.fecha_final,
				params=[fi,ff];
			if(!item.tipo_prenda || item.tipo_prenda.name==="todas"){
				sql[9]="";
			}else{
				params.push(item.tipo_prenda.name);
			}
			//res.send(sql.join(" ")); return;
    connection.runSqlAll(sql.join(" "),params,
      function(err, result) {
      	if(err){ res.send([{error:true,msg:JSON.stringify(err)}]); return;}
      	res.send(result);
      });
  });
};
