var
  express    = require('express'),
  path       = require('path'),
  crypto     = require('crypto'),
  sqlite3    = require('sqlite3'),
  crud       = require('./server/crud.js'),
  tickets    = require('./server/tickets.js'),
  reportes    = require('./server/reportes.js'),
  settings    = require('./server/settings.js'),
  usuarios    = require('./server/usuarios.js'),
  //db       = new sqlite3.Database('database.db'),
  app        = express(),
  persist    = require("persist"),
  type       = persist.type,
  models     = require('./server/models/index.js'),
  tables     = ["users", "sacos", "pantalones", "camisas", "chalecos", "togas", "corbatas", "gaznes", "corbatines", "monios", "zapatos", "colores", "estilos"],
  connection = null,
  execPath = path.dirname( process.execPath );



persist.connect({
  driver: 'sqlite3',
  //filename: execPath+'/database.db',
  filename: 'database.db',
  trace: true
}, function(err, conn) {
  connection = conn;
});
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'public/build')));
});



for (var i = 0; i < tables.length; i++) {
  crud.add(app, connection, tables[i], models);
}
tickets.init(app, connection, models,persist);
reportes.init(app, connection, models);
usuarios.init(app, connection, models);
settings.init(app, connection, persist);

app.post('/login', function(req, res) {
  //res.send(JSON.stringify(req.body)); return;
   connection.runSqlAll('select * from usuarios where nombre=? and password=? and borrado=0',[req.body.username,req.body.password], function(err, result) {
    if(err){
      res.send(err);return;
    }
    if(result[0]){
      res.send(result[0]);
      return;  
    }
    res.send('{"response": "invalid"}');
  });
});
app.get('/api', function(req, res) {
  res.send('API is running');
});

var server=app.listen(app.get('port'));



console.log('Server listening on port ' + app.get('port'));

