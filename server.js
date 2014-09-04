var
  express = require("express"),
  path = require("path"),
  crypto = require('crypto'),

  nedb = require('nedb');

var db={};
var tables=["users","sacos","pantalones","camisas","chalecos","togas","corbatas","gaznes","corbatines","monios","zapatos"];
for(var i=0; i<tables.length; i++){
  db[tables[i]]=new nedb({filename: "db/"+tables[i]+".json",autoload:true});
}
db.users.ensureIndex({fieldName:"username",unique: true} );
db.sacos.ensureIndex({fieldName:"codigo",unique: true} );
db.pantalones.ensureIndex({fieldName:"codigo",unique: true} );
var app = express();

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser()),
  app.use(express.static(path.join(__dirname, 'public/build')));
});
app.post('/login',function(req,res){
  //res.send(JSON.stringify(req.body)); return;
    db.users.find({username: req.body.username,password: req.body.password },function(err,result){
      if(result && result[0] && result[0].username){
          res.send(result[0]._id);
      }else{
        res.send('{"response":false}');
      }
      }
    );
});
app.get('/api', function (req, res) {
  res.send('API is running');
});

for(var i=0; i<tables.length; i++){
  (function(table){

   app.get('/'+table, function (req, res) {
      db[table].find(req.query, function(err, result) {
        res.send(result);
      });
    });

  app.post('/'+table, function (req, res) {
        var item = req.body;
        if(item._id){
          db[table].update({_id: item._id},{$set: item},{},function(err,result){
            if (err) {
              res.send({'error':'An error has occurred'});
            } else {
              console.log('Success: ' + JSON.stringify(result));
              res.send(JSON.stringify(result));
            }
          });
          return;
        }
        db[table].insert(item, function (err, result) {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            console.log('Success: ' + JSON.stringify(result));
            res.send(result);
          }
        });
      });

      app.delete('/'+table+'/:id', function (req, res) {
        var id = req.params.id;
        db[table].remove({_id: id}, {}, function (err, result) {
          if (err) {
            res.send({'error':'An error has occurred - ' + err});
          } else {
            console.log('' + result + ' document(s) deleted');
            res.send(req.body);
          }
        });
      });
  })(tables[i]);
}


app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));