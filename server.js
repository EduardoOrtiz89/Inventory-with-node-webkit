
var
  express = require("express"),
  path = require("path"),
  crypto = require('crypto'),
  sqlite3 = require('sqlite3'),
  crud=require('./server/crud.js'),
  tickets=require('./server/tickets.js'),
  db= new sqlite3.Database('database.db');
var app = express();
var tables=["users","sacos","pantalones","camisas","chalecos","togas","corbatas","gaznes","corbatines","monios","zapatos","colores","estilos"];
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'public/build')));


});





for(var i=0; i<tables.length; i++){
  crud.add(app,db,tables[i]);
}
tickets.init(app,db);


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

app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));
