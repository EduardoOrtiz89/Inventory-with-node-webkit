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
    var disponibles = " (usados) as disponibles ";
    if (tipoPrenda !== "colores" && tipoPrenda !== "estilos") {
      tableName="prendas";
      q = "select " + tableName + ".*,estilos.estilo as estilo_desc, colores.color as color_desc, colores.id as color, estilos.id as estilo, " + disponibles + " from " + tableName + " left join estilos on estilos.id=" + tableName + ".estilo left join colores on colores.id=" + tableName + ".color";
      q += " left join tipo_prendas on tipo_prendas.id =" + tableName + ".tipo_prenda";
    } else {
      tableName=tipoPrenda;
      q = "select * from " + tipoPrenda;
    }
   
    var params = [];
    if (Object.keys(query).length !== 0) {
      q += " where ";
      var ands = [];
      Object.keys(query).forEach(function(key) {
        ands.push(" " + tableName + "." + key + " = ?");
        params.push(query[key]);
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
    //res.send(q); return;
    db.runSqlEach(q, params, function(err, rows) {
      result.push(rows);
    }, function complete() {
      res.send(result);
    });

  });


  /****INSERT AND UPDATE***/

  app.post('/' + tipoPrenda, function(req, res) {
    var item = req.body;
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
  });

  /**DELETE**/

  app.delete('/' + tipoPrenda + '/:_id', function(req, res) {
    if (tipoPrenda === "colores" || tipoPrenda === "estilos") {
      tableName = tipoPrenda;
    }
    var _id = req.params._id;
    db.runSql('delete from ' + tableName + " where id=?", [
       _id
    ], function(err, r) {
      res.send(_id);
    });
  });



};