var tableName = "prendas",

  consultaID = function(db, _id, res) {
    var result = [];
    db.runSqlEach("select * from " + tableName + "where id=?", [
      _id
    ], function(err, rows) {
      result.push(rows);
    }, function complete() {
      res.send(result[0]);
    });
  };

var tablesColor = ["sacos", "camisas", "pantalones", "chalecos", "gaznes", "monios", "corbatines", "corbatas", "togas"];
var tablesEstilos = ["sacos", "pantalones", "chalecos"];


module.exports.add = function(app, db, tipoPrenda,models) {
  /**SEARCH*/

  app.get('/' + tipoPrenda, function(req, res) {
    var query = req.query,
      stmt = null;
    var result = [];
    var noUsados = ["togas", "corbatas", "corbatines", "gaznes", "monios", "zapatos"];
    var disponibles = "  ifnull(nuevos+usados  -sum(rentas.cantidad),nuevos+usados) as disponibles";
    if (tipoPrenda !== "colores" && tipoPrenda !== "estilos") {
      tableName="prendas";
      q = "select " + tableName + ".*,estilos.estilo as estilo_desc, colores.color as color_desc, colores.id as color, estilos.id as estilo, " + disponibles + " from " + tableName + " left join estilos on estilos.id=" + tableName + ".estilo left join colores on colores.id=" + tableName + ".color";
      q += " left join tipo_prendas on tipo_prendas.id =" + tableName + ".tipo_prenda";
      q+=' left join rentas on prenda_id=prendas.id left join tickets on ticket_id=tickets.id';
    } else {
      tableName=tipoPrenda;
      q = "select * from " + tipoPrenda;
    }

    var params = [];
    if (Object.keys(query).length !== 0) {
      q += " where ";
      var ands = [];
      Object.keys(query).forEach(function(key) {
        var obj={};
        try{
          obj=JSON.parse(query[key]);
        }catch(e){}
        if(obj.OR){
          var or=[];
            for(var i in obj.OR){
                or.push(" "+key+"="+"'"+obj.OR[i]+"' ");
              }
            ands.push(" ( "+or.join(" or ")+" ) ");
        }else{
          ands.push(" " + tableName + "." + key + " = ?");
          params.push(query[key]);
        }
      });
      if (tipoPrenda !== "colores" && tipoPrenda !== "estilos") {
        ands.push(" tipo_prendas.name" + " = ?");
        params.push(tipoPrenda);

      }
      q += ands.join(" and ");

    } else if (tipoPrenda !== "colores" && tipoPrenda !== "estilos") {
      q += " where ";
      var ands = [];
      ands.push(" tipo_prendas.name" + " = ?");
      params.push(tipoPrenda);
      q += ands.join(" and ");

    }
    if (tipoPrenda !== "colores" && tipoPrenda !== "estilos") {
        q+="  and (status =1 or status=2 or status is null) group by prendas.id";
    }
//    res.send([q]); return;
    db.runSqlEach(q, params, function(err, rows) {
      result.push(rows);
    }, function complete() {
      res.send(result);
    });

  });


  /****INSERT AND UPDATE***/

  app.post('/' + tipoPrenda, function(req, res) {
    var item = req.body;
    item.borrado=0;
    if(!item.funcion){
      item.funcion=1;
    }
    if(!item.nuevos){
      item.nuevos=0;
    }
    if(!item.usados){
      itm.usados=0;
    }
    if(!item.costo_usado){
      item.costo_usado=0;
    }
    if(!item.costo_nuevo){
      item.costo_nuevo=0;
    }
    if(!item.costo_renta){
      item.costo_renta=0;
    }

    models.Tipo_prenda.where('name = ?', tipoPrenda).first(db, function(err, tipo) {
         var Model=null;
         if(err){res.send(err); return;}
         if(tipo){
            item.tipo_prenda =tipo.id;
            Model=models.Prenda;
         }else{
          if(tipoPrenda==="colores"){
            Model=models.Color;
          }else{
            Model=models.Estilo;
          }
         }
         var id=item.id;
         delete item.id;
         delete item.disponibles;
          if (id && id !== 0) { //UPDATE
             Model.update(db,id,item,function(err){
                if(err){res.send(err); return;}
                res.send(item);
             });
          }else{
             var obj=new Model(item);
              obj.save(db,function(err,result){
                if(err) {res.send(err); return;}
                  res.send(result);
              });
          }
    });
    }
  );

  /**DELETE**/

  app.delete('/' + tipoPrenda + '/:_id', function(req, res) {
    if (tipoPrenda === "colores" || tipoPrenda === "estilos") {
      tableName = tipoPrenda;
    }
    var _id = req.params._id;
    db.runSql('update  ' + tableName + " set borrado=1 where id=?", [
       _id
    ], function(err, r) {
      res.send(_id);
    });
  });



};