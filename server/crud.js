var consultaID=function(db,tableName,_id,res){
  var result=[];
    db.each("select * from "+tableName+"where id=$id" ,{id:_id}, function(err, rows) {
      result.push(rows);
    },function complete(){
      res.send(result[0]);
    });
};

var tablesColor=["sacos","camisas","pantalones","chalecos","gaznes","monios","corbatines","corbatas","togas"];
var tablesEstilos=["sacos","pantalones","chalecos"];

module.exports.add =  function(app,db,tableName){
  /**SEARCH*/
  app.get('/'+tableName, function (req, res) {
    var query=req.query,stmt=null;
    var result=[];
    var q="SELECT * from "+tableName;
    if(tablesColor.indexOf(tableName)!==-1 && tablesEstilos.indexOf(tableName)===-1){
      q="select "+tableName+".*,colores.color as color_desc, colores.id as color from "+tableName+" left join colores on colores.id="+tableName+".color";
    }else if(tablesColor.indexOf(tableName)===-1 && tablesEstilos.indexOf(tableName)!==-1){
      q="select "+tableName+".*,estilos.estilo as estilo_desc, estilos.id as estilo from "+tableName+" left join estilos on estilos.id="+tableName+".estilo";
    }else if(tablesColor.indexOf(tableName)!==-1 && tablesEstilos.indexOf(tableName)!==-1){
      q="select "+tableName+".*,estilos.estilo as estilo_desc, colores.color as color_desc, colores.id as color, estilos.id as estilo from "+tableName+" left join estilos on estilos.id="+tableName+".estilo left join colores on colores.id="+tableName+".color";
    }
    //res.send(q); return;
    var params={};
    if(Object.keys(query).length !== 0){
      q+=" where ";
      var ands=[];
      Object.keys(query).forEach(function(key) {
            ands.push(" "+tableName+"."+key+" = $"+key);
            params["$"+key]=query[key];
      });
      q+=ands.join(" and ");

    }
    db.each(q,params, function(err, rows) {
      result.push(rows);
    },function complete(){
      res.send(result);
    });

  });


/****INSERT AND UPDATE***/

  app.post('/'+tableName, function (req, res) {
     var item = req.body;
     var query="";
     var q=[];
     var params={};
     if(item.id && item.id!==0){  //UPDATE
       Object.keys(item).forEach(function(key) {
             if(key!=="id"){
                q.push(" "+key+"= $"+key);
                params["$"+key]=item[key];
             }

       });

        query="UPDATE  "+tableName + " set "+q.join(",") + " where id=$id";
        params.$id=item.id;
        db.run(query,params,function(err,r){
           res.send(item);
        });
       return;
     }

      //insert
      delete item.id;
      var values=Object.keys(item).join(",");
       q=[];
       params={};

      Object.keys(item).forEach(function(key) {
            q.push("$"+key);
            params["$"+key]=item[key];
      });
       query="INSERT INTO "+tableName+"("+values+") VALUES ("+q.join(",")+")";
      db.run(query,params,function(err,r){
         consultaID(db,tableName,this.lastID,res);
      });
  });

    /**DELETE**/

     app.delete('/'+tableName+'/:_id', function (req, res) {
       var _id = req.params._id;
          db.run('delete from '+tableName+" where id=$id" ,{$id:_id},function(err,r){
             res.send(_id);
          });
     });



};
