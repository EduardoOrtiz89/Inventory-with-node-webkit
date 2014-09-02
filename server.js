var
  express = require("express"),
  path = require("path"),
  crypto = require('crypto'),

  nedb = require('nedb');

var db={};
var tables=["users","shirts","sessions","jackets"];
for(var i=0; i<tables.length; i++){
  db[tables[i]]=new nedb({filename: "db/"+tables[i]+".json",autoload:true});
}
db.users.ensureIndex({fieldName:"username",unique: true} );
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
          db.sessions.insert({username: result[0].username});
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

 app.get('/users', function (req, res) {
 var shasum = crypto.createHash('sha1');
 shasum.update("eduardo");
db.users.insert({username:"eduardo",password:  shasum.digest("hex")}, function (err, newDoc) {   // Callback is optional
    db.users.find({}, function(err, result) {
        res.send(result);
      });
});

    });

    app.post('/users', function (req, res) {
      var item = req.body;
      db.users.insert(item, function (err, result) {
        if (err) {
          res.send({'error':'An error has occurred'});
        } else {
          console.log('Success: ' + JSON.stringify(result));
          res.send(result);
l        }
      });
    });

    app.delete('/users/:id', function (req, res) {
      var id = req.params.id;
      db.users.remove({_id: id}, {}, function (err, result) {
        if (err) {
          res.send({'error':'An error has occurred - ' + err});
        } else {
          console.log('' + result + ' document(s) deleted');
          res.send(req.body);
        }
      });
    });

app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));