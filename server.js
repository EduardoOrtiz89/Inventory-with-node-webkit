
var
  express = require("express"),
  path = require("path"),
  crypto = require('crypto'),
  nedb = require('nedb'),
  sqlite3 = require('sqlite3'),
  db= new sqlite3.Database('database.db');
var app = express();
var tables=["users","sacos","pantalones","camisas","chalecos","togas","corbatas","gaznes","corbatines","monios","zapatos","colores","estilos"];
app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'public/build')));
});

router=require('./server/crud.js');
for(var i=0; i<tables.length; i++){
  router.add(app,db,tables[i]);
}


app.get('/print-formats',function(req,res){
    var printer = require("printer"),
    util = require('util');
    console.log("supported formats are:\n"+util.inspect(printer.getSupportedPrintFormats(), {colors:true, depth:10}));
    console.log("supported job commands:\n"+util.inspect(printer.getSupportedJobCommands(), {colors:true, depth:10}));
});


app.get('/print',function(req,res){
    var printer = require("./node_modules/printer/lib/");
    printer.printDirect({data:"print from Node.JS buffer",
    printer:'Foxit Reader PDF Printer',
    docname:"prueba",
    type: 'RAW',

    success:function(jobID){
       //printer.setJob('Foxit Reader PDF Printer',jobID,'SENT-TO-PRINTER');
       //console.log(util.inspect(printer.getPrinters(), {colors:true, depth:10}));
       res.send("sent to printer with ID: "+jobID);
      },
    error:function(err){res.send(err);}
});
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

app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));
