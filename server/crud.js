var tableName = "prendas",

  consultaID = function(db, _id, res) {
    var result = [];
    db.each("select * from " + tableName + "where id=$id", {
      id: _id
    }, function(err, rows) {
      result.push(rows);
    }, function complete() {
      res.send(result[0]);
    });
  };

var tablesColor = ["sacos", "camisas", "pantalones", "chalecos", "gaznes", "monios", "corbatines", "corbatas", "togas"];
var tablesEstilos = ["sacos", "pantalones", "chalecos"];


module.exports.add = function(app, db, tipoPrenda) {
  /**SEARCH*/

  app.get('/' + tipoPrenda, function(req, res) {
    var query = req.query,
      stmt = null;
    var result = [];
    var noUsados = ["togas", "corbatas", "corbatines", "gaznes", "monios", "zapatos"];
    var disponibles = " (usados) as disponibles ";
    if (tipoPrenda !== "colores" && tipoPrenda !== "estilos") {
      q = "select " + tableName + ".*,estilos.estilo as estilo_desc, colores.color as color_desc, colores.id as color, estilos.id as estilo, " + disponibles + " from " + tableName + " left join estilos on estilos.id=" + tableName + ".estilo left join colores on colores.id=" + tableName + ".color";
      q += " left join tipo_prenda on tipo_prenda.id =" + tableName + ".tipo_prenda";
    } else {
      q = "select * from " + tipoPrenda;
    }
    //res.send(q); return;
    var params = {};
    if (Object.keys(query).length !== 0) {
      q += " where ";
      var ands = [];
      Object.keys(query).forEach(function(key) {
        ands.push(" " + tableName + "." + key + " = $" + key);
        params["$" + key] = query[key];
      });
      if (tipoPrenda !== "colores" && tipoPrenda !== "estilos") {
        ands.push(" tipo_prenda.name" + " = $tipo_prenda");
        params["$tipo_prenda"] = tipoPrenda;
      }
      q += ands.join(" and ");

    } else if (tipoPrenda !== "colores" && tipoPrenda !== "estilos") {
      q += " where ";
      var ands = [];
      ands.push(" tipo_prenda.name" + " = $tipo_prenda");
      params["$tipo_prenda"] = tipoPrenda;
      q += ands.join(" and ");
    }
    db.each(q, params, function(err, rows) {
      result.push(rows);
    }, function complete() {
      res.send(result);
    });

  });


  /****INSERT AND UPDATE***/

  app.post('/' + tipoPrenda, function(req, res) {
    if (tipoPrenda === "colores" || tipoPrenda === "estilos") {
      tableName = tipoPrenda;
    }
    var item = req.body;
    var query = "";
    var q = [];
    var params = {};
    delete item.disponibles;
    db.each("select * from tipo_prenda where name=$name", {
      $name: tipoPrenda
    }, function(err, rows) {

      if(rows && rows.id){
         item.tipo_prenda = rows.id;
      }
      if (item.id && item.id !== 0) { //UPDATE
        Object.keys(item).forEach(function(key) {
          if (key !== "id") {
            q.push(" " + key + "= $" + key);
            params["$" + key] = item[key];
          }

        });

        query = "UPDATE  " + tableName + " set " + q.join(",") + " where id=$id";
        params.$id = item.id;
        db.run(query, params, function(err, r) {
          res.send(item);
        });
        return;
      }

      //insert
      delete item.id;
      var values = Object.keys(item).join(",");
      q = [];
      params = {};

      Object.keys(item).forEach(function(key) {
        q.push("$" + key);
        params["$" + key] = item[key];
      });
      query = "INSERT INTO " + tableName + "(" + values + ") VALUES (" + q.join(",") + ")";
      db.run(query, params, function(err, r) {
        consultaID(db, this.lastID, res);
      });
    });



  });

  /**DELETE**/

  app.delete('/' + tipoPrenda + '/:_id', function(req, res) {
    if (tipoPrenda === "colores" || tipoPrenda === "estilos") {
      tableName = tipoPrenda;
    }
    var _id = req.params._id;
    db.run('delete from ' + tableName + " where id=$id", {
      $id: _id
    }, function(err, r) {
      res.send(_id);
    });
  });



};