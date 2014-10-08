var
  express    = require('express'),
  path       = require('path'),
  crypto     = require('crypto'),
  sqlite3    = require('sqlite3'),
  crud       = require('./server/crud.js'),
  tickets    = require('./server/tickets.js'),
  reportes    = require('./server/reportes.js'),
  //db       = new sqlite3.Database('database.db'),
  app        = express(),
  persist    = require("persist"),
  type       = persist.type,
  models     = require('./server/models/index.js'),
  tables     = ["users", "sacos", "pantalones", "camisas", "chalecos", "togas", "corbatas", "gaznes", "corbatines", "monios", "zapatos", "colores", "estilos"],
  connection = null;
persist.connect({
  driver: 'sqlite3',
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
tickets.init(app, connection, models);
reportes.init(app, connection, models);


app.post('/login', function(req, res) {
  //res.send(JSON.stringify(req.body)); return;
  db.users.find({
    username: req.body.username,
    password: req.body.password
  }, function(err, result) {
    if (result && result[0] && result[0].username) {
      res.send(result[0]._id);
    } else {
      res.send('{"response":false}');
    }
  });
});
app.get('/api', function(req, res) {
  res.send('API is running');
});

app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));